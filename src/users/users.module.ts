import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { WishesModule } from '../wishes/wishes.module';
import { HelpersService } from '../helpers/helpers.service';
import { HelpersModule } from '../helpers/helpers.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), WishesModule, HelpersModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
