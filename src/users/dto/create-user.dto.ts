import { IsEmail, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  about: string;

  @IsUrl()
  avatar: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}