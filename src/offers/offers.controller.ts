import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(@Body() CreateOfferDto: CreateOfferDto) {
    return {};
  }

  @Get()
  findAll() {
    return [
      {
        offer: "offer",
      },
    ];
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      id: id,
      offer: "offer"
    };
  }
}
