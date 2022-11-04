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
  @CreateDateColumn()
  data_insert: Date;
  @OneToMany(()=>Game, game => game.favorite)
  games:Game[]
}
export { Favorite };
