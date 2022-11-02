import { number, string } from 'yup';
import AppDataSource from '../../data-source';
import { Category } from '../../entities/categories.entity';
import { Favorite } from '../../entities/favorite.entity';
import { Game } from '../../entities/games.entity';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';
import { IGamesrequest } from '../../interfaces/games';

const createGamesServices = async ({
  name,
  price,
  age,
  launch,
  developer,
  description,
  image,
}: //id_categoryId,
IGamesrequest) => {
  const gamesRepository = AppDataSource.getRepository(Game);
  const games = await gamesRepository.find();

  //console.log(`o valor de id_categoryId é ${id_categoryId}`);

  const verifyGameAlreadyExist = games.find(game => game.name === name);

  if (verifyGameAlreadyExist) {
    throw new AppError('This game already exists');
  }

  /*const categoryRepository = AppDataSource.getRepository(Category);
  const id = id_categoryId;
  // verifica se a categoria existe e se não existir retorna um erro
  const verifycategoryAlreadyExist = await categoryRepository.findOne({
    where: id,
  });  

  if (!verifycategoryAlreadyExist) {
    throw new AppError('category not found!');
  }*/

  const newGame = await gamesRepository.save({
    name,
    price,
    age,
    launch,
    developer,
    description,
    image,
    //  id_categoryId,
  });

  return newGame;
};
export { createGamesServices };
