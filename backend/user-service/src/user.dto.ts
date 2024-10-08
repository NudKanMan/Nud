export class LoginRequestDto {
  email: string;
  password: string;
}

export class RegisterRequestDto {
  email: string;
  password: string;
  name: string;
}

export class UpdateProfileRequestDto {
  token: string;
  email: string;
  name: string;
}

export class GetProfileRequestDto {
  id: string;
}

export class DeleteProfileRequestDto {
  token: string;
}
