import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Wish } from '../../wishes/entities/wish.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //todo: добавить мнимальную длинну равную 2
  @Column({
    type: "varchar",
    length: 30,
    unique: true,
  })
  username: string;

  //todo: добавить мнимальную длинну равную 2
  @Column({
    type: "varchar",
    length: 200,
    default: "Пока ничего не рассказал о себе",
  })
  about: string;

  @Column({
    type: "varchar",
    default: "https://i.pravatar.cc/300",
  })
  avatar: string;

  @Column({
    type: "varchar",
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  //todo: offers

  //todo: wishlists
}