import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { validate } from 'class-validator';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto, user: User) {
    const wish = this.wishesRepository.create({
      ...createWishDto,
      owner: user,
    })
    const errors = await validate(wish);
    if (errors.length > 0) {
      const messages = errors.map((error) => error.constraints);
      throw new BadRequestException(messages);
    }
    await this.wishesRepository.save(wish);
  }
  async findOne(id: string) {
    try {
      return await this.wishesRepository.findOneOrFail({
        where: { id },
        relations: {owner: true, offers: true},
      });
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const err = error.driverError;
        if (err.code === '22P02') {
          throw new BadRequestException(
            'Подарок с таким id не найден!',
          );
        }
      }
    }

  }
}
