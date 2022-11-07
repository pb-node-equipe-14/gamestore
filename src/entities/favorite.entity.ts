import {
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Game } from './games.entity';

@Entity('favorite')
class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Game, game => game.favorite, { eager: true })
  games: Game[];
}
export { Favorite };
