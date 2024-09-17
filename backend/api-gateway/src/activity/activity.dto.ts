import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class ActivityDto {
  @ApiProperty({ description: 'The title of the activity' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The email of the user',
  })

  @IsDate()
  start_date: string;

  @ApiProperty({
    description: 'The email of the user',
  })
  @IsDate()
  end_date: string;

  @ApiProperty({ description: 'The owner of the activity' })
  @IsString()
  @IsNotEmpty()
  owner_id: string;
}
