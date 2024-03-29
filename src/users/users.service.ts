import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    const errors = await validate(user);
    if (errors.length > 0) {
      const messages = errors.map((error) => error.constraints);
      throw new BadRequestException(messages);
    }
    user.password = await bcrypt.hash(createUserDto.password, 10);
    try {
      const newuser = await this.usersRepository.save(user);
      return newuser;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const err = error.driverError;
        if (err.code === '23505') {
          throw new ConflictException(
            'Пользователь с таким email или username уже зарегистрирован',
          );
        }
      }
    }
  }

  async updateById(id: string, updateUserDto: UpdateUserDto) {
    const existUser = await this.usersRepository.findOne({
      select: { username: true, password: true, id: true, about: true, avatar: true, email: true },
      where: { id },
    });

    let newPassword: string;

    if (updateUserDto.password) {
      newPassword = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = {
      id: existUser.id,
      username: updateUserDto.username ? updateUserDto.username : existUser.username,
      about: updateUserDto.about ? updateUserDto.about : existUser.about,
      avatar: updateUserDto.avatar ? updateUserDto.avatar : existUser. avatar,
      email: updateUserDto.email ? updateUserDto.email : existUser.email,
      password: newPassword ? newPassword : existUser.password,
    }

    const user = this.usersRepository.create(updatedUser);

    const errors = await validate(user);
    if (errors.length > 0) {
      const messages = errors.map((error) => error.constraints);
      throw new BadRequestException(messages);
    }

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const err = error.driverError;
        if (err.code === '23505') {
          throw new ConflictException(
            'Пользователь с таким email или username уже зарегистрирован',
          );
        }
      }
    }
  }

  async findByUsername(username: string) {
    return await this.usersRepository
      .findOneOrFail({
      select: { username: true, password: true, id: true },
      where: { username },
    });
  }

  async findOne(id: string) {
    return await this.usersRepository.findOneOrFail({
      where: { id },
      //todo добавить в relations wishlists
      relations: { wishes: true, offers: true }
    });
  }
}
