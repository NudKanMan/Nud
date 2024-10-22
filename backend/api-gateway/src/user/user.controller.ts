import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteProfileRequestDto,
  GetProfileRequestDto,
  LoginRequestDto,
  RegisterUserDto,
  UpdateProfileDTO,
  UpdateProfileRequestDTO,
} from './user.dto';
import { JwtUserGuard } from 'src/guard/auth.guard';

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

  @Get('getmyprofile')
  @UseGuards(JwtUserGuard)
  getMyProfile(@Req() req) {
    if (!req.userId) throw new Error('User not found');
    return this.getProfile(req.userId);
  }

  @Get('/getprofile/:id')
  getProfile(@Param('id') id: string) {
    return this.userService.getProfile({ id });
  }

  @Patch()
  updateProfile(
    @Body() data: UpdateProfileDTO,
    @Headers('authorization') authHeader: string,
  ) {
    const token = authHeader.split(' ')[1];
    return this.userService.updateProfile({
      email: data.email,
      name: data.name,
      token: token,
    });
  }

  @Delete()
  deleteProfile(@Headers('authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];
    return this.userService.deleteProfile({ token });
  }
}
