import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  auth(user: User) {
    const payload = { sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  };
  async validatePassword(username: string, password: string) {
    let user: User;
    try {
      user = await this.usersService.findByUsername(username);
    } catch(error) {
      console.log(error)
    }
    return user;
  };
}

