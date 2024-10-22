import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FriendMatchingService } from './friend-matching.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtUserGuard } from 'src/guard/auth.guard';
import {
  AcceptFriendRequestDto,
  RequestFriendDto,
} from './friend-matching.dto';

@ApiTags('Friend Matching')
@Controller('friend-matching')
export class FriendMatchingController {
  constructor(private readonly friendMatchingService: FriendMatchingService) {}

  @Post('/request-friend')
  @UseGuards(JwtUserGuard)
  requestFriend(@Req() req, @Body() data: RequestFriendDto) {
    if (!req.userId) throw new Error('User not found');
    data.userId = req.userId;
    return this.friendMatchingService.requestFriend(data);
  }

  @Post('/accept-friend')
  @UseGuards(JwtUserGuard)
  acceptFriend(@Req() req, @Body() data: AcceptFriendRequestDto) {
    if (!req.userId) throw new Error('User not found');
    data.userId = req.userId;
    return this.friendMatchingService.acceptFriend(data);
  }

  @Get('/get-friend-list')
  @UseGuards(JwtUserGuard)
  getFriendList(@Req() req) {
    if (!req.userId) throw new Error('User not found');
    return this.friendMatchingService.getFriendList({
      userId: req.userId,
    });
  }

  @Get('/get-friend-request-list')
  @UseGuards(JwtUserGuard)
  getFriendRequestList(@Req() req) {
    if (!req.userId) throw new Error('User not found');
    return this.friendMatchingService.getFriendRequestList({
      userId: req.userId,
    });
  }

  @Get('/is-friend/:id')
  @UseGuards(JwtUserGuard)
  isFriend(@Req() req, @Param('id') id: string) {
    if (!req.userId) throw new Error('User not found');
    return this.friendMatchingService.isFriend({
      userId: req.userId,
      friendId: id,
    });
  }

  @Post('/reject-friend')
  @UseGuards(JwtUserGuard)
  rejectFriend(@Req() req, @Body() data: AcceptFriendRequestDto) {
    if (!req.userId) throw new Error('User not found');
    data.userId = req.userId;
    return this.friendMatchingService.rejectFriend(data);
  }
}
