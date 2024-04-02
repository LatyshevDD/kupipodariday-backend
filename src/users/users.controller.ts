import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../guards/jwt.guard';
import { User } from './entities/user.entity';
import { WishesService } from '../wishes/wishes.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private  readonly wishesService: WishesService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('me')
  findOwn(@Req() req: Request & { user: User } ) {
    return req.user;
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  async update(@Body() updateUserDto: UpdateUserDto, @Req() req: Request & { user: User }) {
    return await this.usersService.updateById(req.user.id, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Get('me/wishes')
  async getOwnWishes(@Req() req: Request & { user: User }) {
    return await this.wishesService.findByUserId(req.user.id);
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return {
      id: 5,
      username: 'user',
      about: 'Пока ничего не рассказал о себе',
      avatar: 'https://i.pravatar.cc/300',
      createdAt: '2024-03-16T13:48:42.013Z',
      updatedAt: '2024-03-16T13:48:42.013Z',
    };
  }

  @Get(':username/wishes')
  getWishes(@Param('username') username: string) {
    return [
      {
        user: 'username',
        wishes: 'wishes',
      },
    ];
  }

  @Post('find')
  findMany(@Body() FindUserDto: FindUserDto) {
    return [
      {
        id: 5,
        username: "user",
        about: "Пока ничего не рассказал о себе",
        avatar: "https://i.pravatar.cc/300",
        email: "user@yandex.ru",
        createdAt: "2024-03-16T14:17:41.253Z",
        updatedAt: "2024-03-16T14:17:41.253Z"
      },
    ];
  }
}
