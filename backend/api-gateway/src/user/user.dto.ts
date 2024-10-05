import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ description: 'The name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The password for the user account' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginRequestDto {
  @ApiProperty({ description: "Requested user's email" })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: "Requested user's password" })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateProfileRequestDTO {
  @ApiProperty({ description: "Requested user's token" })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ description: "Requested user's email" })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: "Requested user's name" })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class GetProfileRequestDto {
  @ApiProperty({ description: "Requested user's token" })
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class DeleteProfileRequestDto {
  token: string;
}

export class UpdateProfileDTO {
  email: string;
  name: string;
}
