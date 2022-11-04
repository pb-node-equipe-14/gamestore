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
  @OneToMany(()=>Game, id_game => id_game.name )
  id_games:Game[]
}
export { Favorite };
