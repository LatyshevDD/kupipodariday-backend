import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Wish {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

 //todo: имя не может быть короче одного символа
  @Column({
    type: "varchar",
    length: 250,
  })
  name: string;

  @Column()
  link: string;

  //todo: должна быть проверка на валидный url
  @Column()
  image: string;

  //todo: должно быть округление до сотых
  @Column()
  price: number;

  //todo: должно быть округление до сотых
  @Column()
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  //todo: должно быть не менее 1 символа
  @Column({
    type: "varchar",
    length: 1024,
  })
  description: string;

  //todo: offers

  //todo: должно быть целое десятичное число
  @Column()
  copied: number;



}