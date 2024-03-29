import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { In, QueryFailedError, Repository } from 'typeorm';
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
    });
    const errors = await validate(wish);
    if (errors.length > 0) {
      const messages = errors.map((error) => error.constraints);
      throw new BadRequestException(messages);
    }
    await this.wishesRepository.save(wish);
  }
  async findOne(id: string) {
    try {
      //todo: удалить файл types findOptions
      return await this.wishesRepository.findOneOrFail({
        where: { id },
        //todo: добавить wishlists
        relations: { owner: true, offers: true }
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

  async checkOwner(wishId: string, userId: string) {
    let wish: Wish;
    try {
      wish = await this.wishesRepository.findOne({
        where: { id: wishId },
        select: {id: true},
        relations: { owner: true }
      })

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
    if (wish.owner.id === userId) {
      throw new ForbiddenException('Не допускается скидываться на собственные подарки')
    }
  }

  async checkRaised(wishId: string, offerAmount: number) {
    let wish: Wish;
    try {
      wish = await this.wishesRepository.findOne({
        where: { id: wishId },
        select: { raised: true, price: true },
      })
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
    if (wish.price === wish.raised) {
      throw new ForbiddenException('На данный подарок уже собраны средства')
    }

    if (wish.price < wish.raised + offerAmount) {
      throw new ForbiddenException('Сумма собранных средств не может превышать стоимость подарка')
    }
  }

  async updateRaised(wishId: string, amount: number) {
    let wish: Wish;
    try {
      wish = await this.wishesRepository.findOne({
        where: { id: wishId },
        select: { raised: true },
      })
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
    const raised = parseFloat((wish.raised + amount).toFixed(2));
    await this.wishesRepository.save({ id: wishId, raised: raised });
  }

  findManyById(wishesId: string[]) {
    return this.wishesRepository.find({
      where: {
        id: In(wishesId)
      }
    })
  }
}
