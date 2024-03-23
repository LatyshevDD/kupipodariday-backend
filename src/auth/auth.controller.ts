import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { LocalGuard } from '../guards/local.guard';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  // @UseGuards(LocalGuard)
  @UseGuards(AuthGuard('local'))

  @Post('signin')
  signin(@Req() req: {user: User}) {
    return this.authService.auth(req.user);
  }
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return this.usersService.findByUsername(user.username);
  }
}
