import {
  Body,
  Controller,
  Delete, ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { JwtGuard } from '../guards/jwt.guard';
import { User } from '../users/entities/user.entity';
import { UpdateWishDto } from './dto/update-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(
    @Body() createWishDto: CreateWishDto,
    @Req() req: Request & { user: User },
  ) {
    return this.wishesService.create(createWishDto, req.user);
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

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request & { user: User }) {
    return this.wishesService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
    @Req() req: Request & { user: User }
  ) {
    const isOwner = await this.wishesService.checkOwner(id, req.user.id)
    if (!isOwner) {
      throw new ForbiddenException("Вы можете изменять только свои wishes")
    }
    if (updateWishDto.price) {
      const isOffers = await this.wishesService.checkOffers(id);
      if (isOffers) {
        throw new ForbiddenException("Нельзя изменять цену на подарки, для которых есть offer")
      }
    }
    return await this.wishesService.update(id, updateWishDto);
  }

  @Delete(':id')
  removeOne(@Param('id') id: string) {
    return {};
  }

  @Post(':id/copy')
  copyWish(@Param('id', ParseIntPipe) id: number) {
    return {};
  }
}
