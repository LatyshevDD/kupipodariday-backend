import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Wish } from '../../wishes/entities/wish.entity';
import { Wishlist } from '../../wishlists/entities/wishlists.entity';
import { Offer } from '../../offers/entities/offer.entity';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: "varchar",
    unique: true,
  })
  @IsString()
  @Length(2,30)
  username: string;

  @Column({
    type: "varchar",
    default: "Пока ничего не рассказал о себе",
  })
  @IsString()
  @Length(2,200)
  @IsOptional()
  about: string;

  @Column({
    type: "varchar",
    default: "https://i.pravatar.cc/300",
  })
  @IsUrl()
  @IsOptional()
  avatar: string;

  @Column({
    type: "varchar",
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.owner)
  offers: Offer[];

  //todo: wishlists
  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}