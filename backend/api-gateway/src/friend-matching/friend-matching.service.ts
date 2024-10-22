import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { GRPC_PACKAGE } from 'src/constant/grpc';
import { RequestFriendDto } from './friend-matching.dto';

interface FriendMatchingGrpcService {
  RequestFriend(data: any): Observable<any>;
  AcceptFriend(data: any): Observable<any>;
  GetFriendList(data: any): Observable<any>;
  GetFriendRequestList(data: any): Observable<any>;
  IsFriend(data: any): Observable<any>;
  RejectFriend(data: any): Observable<any>;
}

@Injectable()
export class FriendMatchingService {
  private friendMatchingService: FriendMatchingGrpcService;
  constructor(
    @Inject(GRPC_PACKAGE.FRIEND_MATCHING_PACKAGE)
    private readonly friendMatchingGrpcService: ClientGrpc,
  ) {}

  onModuleInit() {
    this.friendMatchingService =
      this.friendMatchingGrpcService.getService<FriendMatchingGrpcService>(
        'FriendMatchingService',
      );
  }

  requestFriend(data: RequestFriendDto) {
    return this.friendMatchingService.RequestFriend(data);
  }

  acceptFriend(data: any) {
    return this.friendMatchingService.AcceptFriend(data);
  }

  getFriendList(data: any) {
    return this.friendMatchingService.GetFriendList(data);
  }

  getFriendRequestList(data: any) {
    return this.friendMatchingService.GetFriendRequestList(data);
  }

  isFriend(data: any) {
    return this.friendMatchingService.IsFriend(data);
  }

  rejectFriend(data: any) {
    return this.friendMatchingService.RejectFriend(data);
  }
}
