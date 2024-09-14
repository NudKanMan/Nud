import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { GRPC_PACKAGE } from 'src/constant/grpc';

interface UserGrpcService {
  Login(data: any): Observable<any>;
  Register(data: any): Observable<any>;
  GetProfile(data: any): Observable<any>;
  UpdateProfile(data: any): Observable<any>;
  DeleteProfile(data: any): Observable<any>;
}

@Injectable()
export class UserService {
  private activityService: UserGrpcService;

  constructor(
    @Inject(GRPC_PACKAGE.USER_PACKAGE)
    private readonly userGrpcService: ClientGrpc,
  ) {}

  onModuleInit() {
    this.activityService =
      this.userGrpcService.getService<UserGrpcService>('UserService');
  }

  register(data: any) {
    return this.activityService.Register(data);
  }
}
