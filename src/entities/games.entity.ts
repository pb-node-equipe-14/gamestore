import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './categories.entity';
import { Favorite } from './favorite.entity';

@Entity('games')
class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column('float')
  price: number;

  @Column()
  age: number;

  @CreateDateColumn({ type: 'date' })
  launch: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  description: string;

  @Column()
  developer: string;

  @Column()
  image: string;

  @ManyToOne(() => Category)
  category: Category;

  @ManyToOne(() => Favorite)
  favorite: Favorite;
}
export { Game };
