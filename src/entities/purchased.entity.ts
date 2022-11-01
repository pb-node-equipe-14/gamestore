import {
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Game } from './games.entity';
import { User } from './user.entity';

@Entity('purchased')
export class Purchased {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  aquisitonAt: Date;

  //relação de manyToOne com users
  @ManyToOne(() => User)
  user: User  
  
  @ManyToMany((type) => Game, {
    eager: true,
  })
  @JoinTable()
  products: Game[];

}


