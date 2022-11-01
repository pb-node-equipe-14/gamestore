import { Entity, ManyToOne } from 'typeorm';
import { Games } from './games.entity';
import { Purchased } from './purchased.entity';

@Entity('games_purchased')
class Game_purchased {
  //relação de manyToOne com Games
  @ManyToOne(() => Games, { eager: true })
  games: Games;

  //relação de manyToOne com Purchased
  @ManyToOne(() => Purchased)
  purchased: Purchased;
}

export { Game_purchased };
