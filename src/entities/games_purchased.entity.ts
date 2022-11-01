import {
  Entity,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('purchased')
export class Purchased {

  //relação de manyToOne com Games
  @ManyToOne(() => Games, { eager: true })
  games: Games

  //relação de manyToOne com Purchased
  @ManyToOne(() => Purchased)
  purchased: Purchased

}