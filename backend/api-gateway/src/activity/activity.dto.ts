import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsISO8601,
  IsUUID,
  IsEmail,
} from 'class-validator';

// DTO for creating an activity
export class CreateActivityDto {
  @ApiProperty({ description: 'The title of the activity' })
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

  @ApiProperty({ description: 'The end date of the activity in ISO format' })
  @IsISO8601()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({ description: 'The owner ID of the activity' })
  @IsString()
  @IsNotEmpty()
  ownerId: string;
}

// DTO for updating an activity
export class UpdateActivityDto {
  @ApiProperty({ description: 'The ID of the activity', type: String })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'The title of the activity' })
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

  @ApiProperty({ description: 'The end date of the activity in ISO format' })
  @IsISO8601()
  @IsNotEmpty()
  endDate: string;
}

// DTO for deleting an activity
export class DeleteActivityDto {
  @ApiProperty({ description: 'The ID of the activity', type: String })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

// DTO for getting an activity by ID
export class GetActivityDto {
  @ApiProperty({ description: 'The ID of the activity', type: String })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

// DTO for the activity response
export class ActivityResponseDto {
  @ApiProperty({ description: 'The ID of the activity', type: String })
  id: string;

  @ApiProperty({ description: 'The title of the activity' })
  title: string;

  @ApiProperty({ description: 'The description of the activity' })
  description: string;

  @ApiProperty({ description: 'The start date of the activity in ISO format' })
  startDate: string;

  @ApiProperty({ description: 'The end date of the activity in ISO format' })
  endDate: string;

  @ApiProperty({ description: 'The owner ID of the activity' })
  ownerId: string;
}

// DTO for listing all activities request
export class ListActivitiesDto {}
