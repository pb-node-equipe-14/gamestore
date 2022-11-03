import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Favorite } from './favorite.entity';
import { PaymentInfo } from './payment.entity';

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

  @OneToOne(() => PaymentInfo, { eager: true })
  @JoinColumn()
  @Exclude()
  paymentInfo: PaymentInfo;

  @OneToOne(() => Favorite)
  @JoinColumn()
  favorite: Favorite;

  @OneToOne(() => Cart, { eager: true })
  @JoinColumn()
  @Exclude()
  cart: Cart;
}

export { User };
