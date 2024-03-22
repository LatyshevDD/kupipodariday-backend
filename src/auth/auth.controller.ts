import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);

    // return this.authService.auth(user);
  }
}
