import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../guards/jwt.guard';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  findOwn(@Req() req: Request & { user: User} ) {
    return req.user;
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  async update(@Body() updateUserDto: UpdateUserDto, @Req() req: Request & { user: User }) {
    return await this.usersService.updateById(req.user.id, updateUserDto);
  }

  @Get('me/wishes')
  getOwnWishes() {
    return [
      {
        id: 0,
        createdAt: '2024-03-16T12:25:56.677Z',
        updatedAt: '2024-03-16T12:25:56.677Z',
        name: 'string',
        link: 'string',
        image: 'string',
        price: 1,
        raised: 1,
        copied: 0,
        description: 'string',
        owner: {
          id: 5,
          username: 'user',
          about: 'Пока ничего не рассказал о себе',
          avatar: 'https://i.pravatar.cc/300',
          createdAt: '2024-03-16T12:25:56.677Z',
          updatedAt: '2024-03-16T12:25:56.677Z',
        },
        offers: ['string'],
      },
    ];
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
