import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsISO8601,
  IsNumber,
} from 'class-validator';

// DTO for creating an activity
export class CreateActivityDto {
  @ApiProperty({
    description: 'The title of the activity',
    default: 'Activity Title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the activity',
    default: 'Activity Description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The maximum number of participants',
    default: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  maxParticipants: number;

  @ApiProperty({
    description: 'The start date of the activity in ISO format',
    default: '2021-01-01',
  })
  @IsISO8601()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    description: 'The end date of the activity in ISO format',
    default: '2021-01-02',
  })
  @IsISO8601()
  @IsNotEmpty()
  endDate: string;

  ownerId: string;
}

// DTO for updating an activity
export class UpdateActivityDto {
  @ApiProperty({
    description: 'The title of the activity',
    default: 'Activity Title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The description of the activity' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'The start date of the activity in ISO format' })
  @IsISO8601()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    description: 'The end date of the activity in ISO format',
    default: '2021-01-02',
  })
  @IsISO8601()
  @IsNotEmpty()
  endDate: string;

  ownerId: string;
}

// DTO for joining an activity
export class JoinActivityDto {
  @ApiProperty({ description: 'The ID of the activity', type: String })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  userId: string;
}

// DTO for leaving an activity
export class LeaveActivityDto {
  @ApiProperty({ description: 'The ID of the activity', type: String })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  userId: string;
}

// DTO for getting an activity by ID
export class GetActivityDto {
  @ApiProperty({ description: 'The ID of the activity', type: String })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
