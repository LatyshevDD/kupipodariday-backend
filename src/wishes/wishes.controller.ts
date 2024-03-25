import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post, Req, UseGuards,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { JwtGuard } from '../guards/jwt.guard';
import { User } from '../users/entities/user.entity';

@Controller('wishes')
export class WishesController {
  constructor(
    private readonly wishesService: WishesService
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createWishDto: CreateWishDto, @Req() req: Request & { user: User }) {
    await this.wishesService.create(createWishDto, req.user);
    return {};
  }

  @Get('last')
  findLast() {
    return {
      lastwish: 'lastwish',
    };
  }

  @Get('top')
  findTop() {
    return {
      topwish: 'toptwish',
    };
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      id: id,
      wish: 'wish',
    };
  }

  //todo: уточнить тип body у входящего запроса
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() object: object) {
    return {};
  }

  @Delete(':id')
  removeOne(@Param('id', ParseIntPipe) id: number) {
    return {
      id: id,
      removedwish: 'wish',
    };
  }

  @Post(':id/copy')
  copyWish(@Param('id', ParseIntPipe) id: number) {
    return {};
  }
}
