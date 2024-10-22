import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  LoginRequestDto,
  RegisterRequestDto,
  GetProfileRequestDto,
  UpdateProfileRequestDto,
  DeleteProfileRequestDto,
} from './user.dto';

@Controller()
export class AppController {
  constructor(private readonly friendMatchingService: AppService) {}

  @GrpcMethod('FriendMatchingService', 'RequestFriend')
  async requestFriend(data: any) {
    return this.friendMatchingService.requestFriend(data);
  }

  @GrpcMethod('FriendMatchingService', 'AcceptFriend')
  async acceptFriend(data: any) {
    return this.friendMatchingService.acceptFriend(data);
  }

  @GrpcMethod('FriendMatchingService', 'GetFriendList')
  async getFriendList(data: any) {
    return this.friendMatchingService.getFriendList(data);
  }

  @GrpcMethod('FriendMatchingService', 'GetFriendRequestList')
  async getFriendRequestList(data: any) {
    return this.friendMatchingService.getFriendRequestList(data);
  }

  @GrpcMethod('FriendMatchingService', 'IsFriend')
  async isFriend(data: any) {
    return this.friendMatchingService.isFriend(data);
  }
}
