import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { FriendRequest } from 'src/entities/friend-request.entity';
import { RmqService } from './rabbitmq/rmq.service';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepository: Repository<FriendRequest>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
}
