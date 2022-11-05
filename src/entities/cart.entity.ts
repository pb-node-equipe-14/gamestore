import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Game } from './games.entity';

@Entity('cart')
class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float')
  subtotal: number;

  @ManyToMany(() => Game, {
    eager: true,
  })
  @JoinTable()
  games: Game[];
}

export { Cart };
