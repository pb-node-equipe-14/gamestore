import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Favorite } from './favorite.entity';
import { PaymentInfo } from './payment.entity';
import { Purchased } from './purchased.entity';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'integer' })
  age: number;

  @Column({ unique: true })
  email: string;

  @Column()
  isAdm: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => PaymentInfo, payment_infos => payment_infos.user)
  paymentInfo: PaymentInfo[];

  @OneToOne(() => Favorite, { eager: true })
  @JoinColumn()
  @Exclude()
  favorite: Favorite;

  @OneToOne(() => Cart, { eager: true })
  @JoinColumn()
  @Exclude()
  cart: Cart;

  @OneToMany(type => Purchased, purchased => purchased.user, { eager: true })
  @JoinColumn()
  @Exclude()
  purchased: Purchased[];
}
export { User };
