import { IsEmail, IsNumber, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  username: string;
}

export class updateUserDto {
  @IsString()
  username?: string;
  @IsString()
  fullName?: string;
  @IsString()
  avatar?: string;
  @IsString()
  mobile?: string;
  @IsStrongPassword()
  password?: string;
  @IsNumber()
  status?: number;
}
