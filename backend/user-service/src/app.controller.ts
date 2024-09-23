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
  constructor(private readonly userService: AppService) {}

  @GrpcMethod('UserService', 'Login')
  async login(data: LoginRequestDto) {
    return this.userService.login(data.email, data.password);
  }

  @GrpcMethod('UserService', 'Register')
  async register(data: RegisterRequestDto) {
    return this.userService.register(data.email, data.password, data.name);
  }

  @GrpcMethod('UserService', 'GetProfile')
  async getProfile(data: GetProfileRequestDto) {
    return this.userService.getProfile(data.token);
  }

  @GrpcMethod('UserService', 'UpdateProfile')
  async updateProfile(data: UpdateProfileRequestDto) {
    return this.userService.updateProfile(data.token, data.email, data.name);
  }

  @GrpcMethod('UserService', 'DeleteProfile')
  async deleteProfile(data: DeleteProfileRequestDto) {
    return this.userService.deleteProfile(data.token);
  }
}
