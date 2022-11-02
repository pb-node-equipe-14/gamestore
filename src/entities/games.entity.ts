import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './categories.entity';

@Entity('games')
class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @Column()
  age: number;

  @CreateDateColumn({ type: 'date' })
  launch: string;

  @Column()
  description: string;

  @Column()
  developer: string;

  @Column()
  image: string;

  // @ManyToOne(()=> Category)
  // id_category: Category
}
export { Game };
