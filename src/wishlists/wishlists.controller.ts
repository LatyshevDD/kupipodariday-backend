import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistlistDto } from './dto/create-wishlistlist.dto';
import { UpdateWishlistlistDto } from './dto/update-wishlistlist.dto';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistlistsService: WishlistsService) {}

  @Get()
  findAll() {
    return [
      {
        wishlist1: "wishlist1",
      },
      {
        wishlist2: "wishlist2",
      }
    ];
  }
  @Post()
  create(@Body() createWishlistlistDto: CreateWishlistlistDto) {
    return {
      newwishlist: "newwishlist"
    };
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
