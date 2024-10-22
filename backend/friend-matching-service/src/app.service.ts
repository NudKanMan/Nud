import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const friend = await this.userRepository.findOne({
      where: { id: friendId },
    });
    if (!friend) {
      throw new HttpException('Friend not found', HttpStatus.NOT_FOUND);
    }

    const friendRequest = new FriendRequest();
    friendRequest.senderId = userId;
    friendRequest.receiverId = friendId;
    await this.friendRequestRepository.save(friendRequest);
    return { success: true };
  }

  async acceptFriend(data: any): Promise<any> {
    const { userId, friendId } = data;
    if (userId === friendId) {
      throw new HttpException(
        'Cannot send friend request to yourself',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const friend = await this.userRepository.findOne({
      where: { id: friendId },
    });
    if (!friend) {
      throw new HttpException('Friend not found', HttpStatus.NOT_FOUND);
    }

    try {
      const friendReq = await this.friendRequestRepository.findOne({
        where: {
          senderId: friendId,
          receiverId: userId,
          status: FriendRequestStatus.PENDING,
        },
      });
      if (!friendReq) {
        throw new HttpException(
          'Friend request not found',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.friendsRepository.save({
        userId: userId,
        friendId: friendId,
      });
      await this.friendsRepository.save({
        userId: friendId,
        friendId: userId,
      });
      friendReq.status = FriendRequestStatus.ACCEPTED;
      await this.friendRequestRepository.save(friendReq);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return { success: true };
  }

  async isFriend(data: any): Promise<any> {
    const { userId, friendId } = data;
    const result = await this.friendsRepository.findOne({
      where: { user: { id: userId }, friend: { id: friendId } },
    });
    if (!result)
      return {
        isFriend: false,
      };
    return {
      isFriend: true,
    };
  }

  async getFriendList(data: any) {
    const { userId } = data;
    const friendRecords = await this.friendsRepository.find({
      where: { userId: userId },
      relations: ['friend'],
    });
    const result = friendRecords.map((rec) => {
      return {
        id: rec.friend.id,
        name: rec.friend.name,
        email: rec.friend.email,
        createdAt: rec.createdAt,
      };
    });
    console.log(result);
    return {
      friends: result,
    };
  }

  async getFriendRequestList(data: any) {
    const { userId } = data;
    console.log(userId);
    const friendRequests = await this.friendRequestRepository.find({
      where: { receiverId: userId, status: FriendRequestStatus.PENDING },
    });

    const requestsWithSenders = await Promise.all(
      friendRequests.map(async (req) => {
        const sender = await this.userRepository.findOne({
          where: { id: req.senderId },
        });
        return { ...sender, createdAt: req.createdAt };
      }),
    );
    return {
      friendRequests: requestsWithSenders,
    };
  }

  async rejectFriend(data: any): Promise<boolean> {
    const { userId, friendId } = data;
    if (userId === friendId) {
      throw new HttpException(
        'Cannot send friend request to yourself',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const friend = await this.userRepository.findOne({
      where: { id: friendId },
    });
    if (!friend) {
      throw new HttpException('Friend not found', HttpStatus.NOT_FOUND);
    }

    try {
      const friendReq = await this.friendRequestRepository.findOne({
        where: {
          senderId: friendId,
          receiverId: userId,
          status: FriendRequestStatus.PENDING,
        },
      });
      if (!friendReq) {
        throw new HttpException(
          'Friend request not found',
          HttpStatus.NOT_FOUND,
        );
      }
      friendReq.status = FriendRequestStatus.REJECTED;

      await this.friendRequestRepository.save(friendReq);
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
}
