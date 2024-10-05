import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteProfileRequestDto,
  GetProfileRequestDto,
  LoginRequestDto,
  RegisterUserDto,
  UpdateProfileDTO,
} from './user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  register(@Body() data: RegisterUserDto) {
    return this.userService.register(data);
  }

  @Post('/login')
  login(@Body() data: LoginRequestDto) {
    return this.userService.login(data);
  }

  @Get('/getprofile/:id')
  getProfile(@Param('id') id: string) {
    return this.userService.getProfile({ id });
  }

  @Patch()
  updateProfile(@Body() data: UpdateProfileDTO) {
    return this.userService.updateProfile(data);
  }

  @Delete()
  deleteProfile(@Body() data: DeleteProfileRequestDto) {
    return this.userService.deleteProfile(data);
  }
}
