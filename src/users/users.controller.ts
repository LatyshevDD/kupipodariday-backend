import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findOwn() {
    return {
      id: 5,
      username: 'user',
      about: 'Пока ничего не рассказал о себе',
      avatar: 'https://i.pravatar.cc/300',
      email: 'user@yandex.ru',
      createdAt: '2024-03-16T12:16:41.861Z',
      updatedAt: '2024-03-16T12:16:41.861Z',
    };
  }

  @Patch('me')
  update(@Body() updateUserDto: UpdateUserDto) {
    return {
      id: 5,
      username: 'user',
      about: 'Пока ничего не рассказал о себе',
      avatar: 'https://i.pravatar.cc/300',
      email: 'user@yandex.ru',
      createdAt: '2024-03-16T12:19:51.623Z',
      updatedAt: '2024-03-16T12:19:51.623Z',
    };
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
