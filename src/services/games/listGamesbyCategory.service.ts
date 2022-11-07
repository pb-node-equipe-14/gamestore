import AppDataSource from '../../data-source';
import { Category } from '../../entities/categories.entity';
import { AppError } from '../../errors/appError';

const listGamesbyCategoryService = async (id: string) => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const categoryGames = await categoryRepository.findOne({
    where: {
      id: id,
    },

    relations: {
      games: true,
    },
  });

  if (!categoryGames) {
    throw new AppError('Category not found', 404);
  }

  return categoryGames;
};

export { listGamesbyCategoryService };
