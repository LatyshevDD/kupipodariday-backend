import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { In, QueryFailedError, Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { validate } from 'class-validator';
import { UpdateWishDto } from './dto/update-wish.dto';

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
    return await this.wishesRepository.save(wish);
  }
  async findOne(id: string) {
    try {
      return await this.wishesRepository.findOne({
        where: { id },
        relations: { owner: true, offers: true, wishlists: true }
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

  async findOneWihUser(id: string, isOwner: boolean) {
    if (!isOwner) {
      try {
        return await this.wishesRepository.findOne({
          where: { id },
          select: { description: true, id: true },
          relations: { owner: true, offers: true, }
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
    try {
      return await this.wishesRepository.findOne({
        where: { id },
        select: { name: true, image: true, link: true, raised: true, id: true },
        relations: { offers: true }
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
    return wish.owner.id === userId;
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
        select: { id: true, raised: true },
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
    const raised = wish.raised ? wish.raised : 0;
    const newRaised = parseFloat((raised + amount).toFixed(2));
    await this.wishesRepository.save({ id: wishId, raised: newRaised });
  }

  findManyById(wishesId: string[]) {
    return this.wishesRepository.find({
      where: {
        id: In(wishesId)
      },
    })
  }

  async checkOffers(id: string) {
    const wish = await this.wishesRepository.findOne({
      where: {
        id
      },
      select: {
        id: true
      },
      relations: {
        offers: true
      }
    })
    return wish.offers.length > 0;
  }

  async update(id: string, updateWishDto: UpdateWishDto) {
    let existWish: Wish;
    //todo проверить все методы update на наличие try catch
    try {
      existWish = await this.wishesRepository.findOne({
        where: {
          id
        },
        select: {
          id: true,
          name: true,
          link: true,
          image: true,
          price: true,
          description: true,
        }
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
    const updatedWish = {
      id: existWish.id,
      name: updateWishDto.name ? updateWishDto.name : existWish.name,
      link: updateWishDto.link ? updateWishDto.link : existWish.link,
      image: updateWishDto.image ? updateWishDto.image : existWish.image,
      price: updateWishDto.price ? updateWishDto.price : existWish.price,
      description: updateWishDto.description ? updateWishDto.description : existWish.description,
    };

    const wish = this.wishesRepository.create(updatedWish);

    const errors = await validate(wish);
    if (errors.length > 0) {
      const messages = errors.map((error) => error.constraints);
      throw new BadRequestException(messages);
    }

    return await this.wishesRepository.save(wish);
  }

  async removeOne(id: string) {
    const wish = await this.wishesRepository.findOne({
      where: {
        id,
      },
      relations: {
        offers: true,
        owner: true,
        wishlists: true
      }
    })
    return this.wishesRepository.remove(wish);
  }

  async findLast() {
    return await this.wishesRepository.find({
      take: 40,
      order: {
        createdAt: "DESC",
      },
      relations: {
        owner: true,
      }
    })
  }

  async findTop() {
    return await this.wishesRepository.find({
      take: 20,
      order: {
        copied: "DESC",
      },
      relations: {
        owner: true,
      }
    })
  }
}
