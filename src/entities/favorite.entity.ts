import {
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Game } from './games.entity';

@Entity('favorite')
class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn()
  data_insert: Date;

  @ManyToMany(type => Game, {
    eager: true,
  })
  @JoinTable()
  products: Game[];
}
export { Favorite };
