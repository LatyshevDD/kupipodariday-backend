import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Wishlist } from '../../wishlists/entities/wishlists.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { IsIn, IsInt, IsNumber, IsOptional, IsString, IsUrl, Length } from 'class-validator';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @Column()
  @IsString()
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  //todo: должно быть округление до сотых
  @Column()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  //todo: должно быть округление до сотых
  @Column({ default: null })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  raised: number;

  @Column()
  @IsString()
  @Length(1, 1024)
  description: string;

  @Column({ default: null })
  @IsOptional()
  @IsInt()
  copied: number;
}