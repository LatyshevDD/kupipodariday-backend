import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { JwtGuard } from '../guards/jwt.guard';
import { User } from '../users/entities/user.entity';
import { WishesService } from '../wishes/wishes.service';

@Controller('offers')
export class OffersController {
  constructor(
    private readonly offersService: OffersService,
    private readonly  wishesService: WishesService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createOfferDto: CreateOfferDto, @Req() req: Request & { user: User }) {
    await this.wishesService.checkOwner(createOfferDto.itemId, req.user.id);
    await this.wishesService.checkRaised(createOfferDto.itemId, createOfferDto.amount);
    const wish = await this.wishesService.findOne(createOfferDto.itemId)
    await this.offersService.create(createOfferDto, req.user, wish);
    await  this.wishesService.updateRaised(createOfferDto.itemId, createOfferDto.amount)
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
