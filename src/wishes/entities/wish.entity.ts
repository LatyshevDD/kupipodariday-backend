import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

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
  @Length(1, 250, {
    message: 'Длинна строки должна составлять от 2 до 200 символов',
  })
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({ type: 'numeric' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Значение должно быть округлено до сотых' },
  )
  price: number;

  @Column({ type: 'numeric', default: null })
  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Значение должно быть округлено до сотых' },
  )
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
