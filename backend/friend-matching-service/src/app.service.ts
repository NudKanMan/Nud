import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { FriendRequest } from 'src/entities/friend-request.entity';
import { RmqService } from './rabbitmq/rmq.service';
import { User } from './entities/user.entity';
import { FriendRequestStatus } from './constant/enum';
import { Friends } from './entities/friends.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepository: Repository<FriendRequest>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Friends)
    private readonly friendsRepository: Repository<Friends>,
    private readonly rmqService: RmqService,
  ) {}

  async requestFriend(data: any) {
    const { userId, friendId } = data;
    if (userId === friendId) {
      throw new HttpException(
        'Cannot send friend request to yourself',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const friend = await this.userRepository.findOne(friendId);
    if (!friend) {
      throw new HttpException('Friend not found', HttpStatus.NOT_FOUND);
    }

    const friendRequest = new FriendRequest();
    friendRequest.senderId = userId;
    friendRequest.receiverId = friendId;
    await this.friendRequestRepository.save(friendRequest);
    return true;
  }

  async acceptFriend(data: any): Promise<boolean> {
    const { userId, friendId } = data;
    if (userId === friendId) {
      throw new HttpException(
        'Cannot send friend request to yourself',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const friend = await this.userRepository.findOne(friendId);
    if (!friend) {
      throw new HttpException('Friend not found', HttpStatus.NOT_FOUND);
    }

    try {
      const friendReq = await this.friendRequestRepository.findOne({
        where: { senderId: userId, receiverId: friendId },
      });
      if (!friendReq) {
        throw new HttpException(
          'Friend request not found',
          HttpStatus.NOT_FOUND,
        );
      }
      friendReq.status = FriendRequestStatus.ACCEPTED;
      await this.friendRequestRepository.save(friendReq);

      const friendRecord = new Friends();
      friendRecord.user = user;
      friendRecord.friend = friend;
      await this.friendsRepository.save(friend);
      friendRecord.user = friend;
      friendRecord.friend = user;
      await this.friendsRepository.save(friend);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return true;
  }

  async isFriend(data: any): Promise<boolean> {
    const { userId, friendId } = data;
    const result = await this.friendsRepository.findOne({
      where: { user: { id: userId }, friend: { id: friendId } },
    });
    if (!result) return false;
    return true;
  }

  async getFriendList(data: any) {
    const { userId } = data;
    const friendRecords = await this.friendsRepository.find({
      where: { user: { id: userId } },
    });
    const result = friendRecords.map((rec) => rec.friend);
    return result;
  }

  async getFriendRequestList(data: any) {
    const { userId } = data;
    const friendRequests = await this.friendRequestRepository.find({
      where: { receiverId: userId },
    });
    const requestsWithSenders = await Promise.all(
      friendRequests.map(async (req) => {
        const sender = await this.userRepository.findOne({
          where: { id: req.senderId },
        });
        return sender;
      }),
    );

    return requestsWithSenders;
  }

  // async rejectFriend(data: any): Promise<boolean> {
  //   const { userId, friendId } = data;
  //   if (userId === friendId) {
  //     throw new HttpException(
  //       'Cannot send friend request to yourself',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   const user = await this.userRepository.findOne(userId);
  //   if (!user) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }

  //   const friend = await this.userRepository.findOne(friendId);
  //   if (!friend) {
  //     throw new HttpException('Friend not found', HttpStatus.NOT_FOUND);
  //   }

  //   try {
  //     const friendReq = await this.friendRequestRepository.findOne({
  //       where: { senderId: userId, receiverId: friendId },
  //     });
  //     if (!friendReq) {
  //       throw new HttpException(
  //         'Friend request not found',
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }
  //     friendReq.status = FriendRequestStatus.REJECTED;

  //     await this.friendRequestRepository.save(friendReq);
  //   } catch (error) {
  //     if (error instanceof HttpException) {
  //       throw error;
  //     }

  //     throw new HttpException(
  //       'Internal server error',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  //   return true;
  // }
}
