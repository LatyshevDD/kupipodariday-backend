import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWishlistsDto } from './dto/create-wishlists.dto';
import { UpdateWishlistlistDto } from './dto/update-wishlistlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from '../wishes/entities/wish.entity';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlists.entity';
import { User } from '../users/entities/user.entity';
import { validate } from 'class-validator';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
  ) {}

  async create(createWishlistDto: CreateWishlistsDto, user: User, wishes: Wish[]) {
    const wishlist = this.wishlistRepository.create({
      ...createWishlistDto,
      owner: user,
      items: wishes
    })
    const errors = await validate(wishlist);
    if (errors.length > 0) {
      const messages = errors.map((error) => error.constraints);
      throw new BadRequestException(messages);
    }
    return await this.wishlistRepository.save(wishlist);
  }

  async findAll() {
    return await this.wishlistRepository.find({
      relations: {
        owner: true,
        items: true
      }
    })

  }
}
