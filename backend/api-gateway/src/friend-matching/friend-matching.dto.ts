import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RequestFriendDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  friendId: string;

  userId: string;
}

export class AcceptFriendRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  friendId: string;

  userId: string;
}

export class GetFriendRequestListRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class IsFriendRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  friendId: string;
}

export class RejectFriendRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  friendId: string;
}
