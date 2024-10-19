import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewRequestDto {
  @ApiProperty({
    description: 'The activity ID of the review',
    default: '111-222-333',
  })
  @IsString()
  @IsNotEmpty()
  activityId: string;

  @ApiProperty({
    description: 'The user ID of the review',
    default: '111-222-333',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'The rating of the review',
    default: 5,
  })
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    description: 'The comment of the review',
    default: 'comment',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
