import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistsDto } from './dto/create-wishlists.dto';
import { UpdateWishlistlistDto } from './dto/update-wishlistlist.dto';
import { JwtGuard } from '../guards/jwt.guard';
import { User } from '../users/entities/user.entity';
import { WishesService } from '../wishes/wishes.service';

@Controller('wishlists')
export class WishlistsController {
  constructor(
    private readonly wishlistsService: WishlistsService,
    private readonly wishesService: WishesService
  ) {}

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }
  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createWishlistsDto: CreateWishlistsDto, @Req() req: Request & { user: User }) {
    const wishes = await this.wishesService.findManyById(createWishlistsDto.itemsId);
    return this.wishlistsService.create(createWishlistsDto, req.user, wishes);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      wishlist: "wishlist",
    };
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateWishlistlistDto: UpdateWishlistlistDto) {
    return {
      updatedwishlist: "data"
    };
  }

  @Delete(':id')
  removeOne(@Param('id', ParseIntPipe) id: number) {
    return {
      deletedwishlist: 'data'
    };
  }
}
