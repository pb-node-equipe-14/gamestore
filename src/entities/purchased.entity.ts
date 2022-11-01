import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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
  
  //relação de oneToMany com game_purchased
  @OneToMany(() => Game_purchased, games_purchased => games_purchased.purchased )
  games_purchased: Game_purchased[]

}


