import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { GRPC_PACKAGE } from 'src/constant/grpc';
import {
  DeleteProfileRequestDto,
  GetProfileRequestDto,
  LoginRequestDto,
  RegisterUserDto,
  UpdateProfileDTO,
  UpdateProfileRequestDTO,
} from './user.dto';

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

  register(data: RegisterUserDto) {
    return this.activityService.Register(data);
  }

  login(data: LoginRequestDto) {
    return this.activityService.Login(data);
  }

  getProfile(data: GetProfileRequestDto) {
    return this.activityService.GetProfile(data);
  }

  updateProfile(data: UpdateProfileRequestDTO) {
    return this.activityService.UpdateProfile(data);
  }

  deleteProfile(data: DeleteProfileRequestDto) {
    return this.activityService.DeleteProfile(data);
  }
}
