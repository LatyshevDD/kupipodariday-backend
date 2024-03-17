import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  create(@Body() CreateWishDto: CreateWishDto) {
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
