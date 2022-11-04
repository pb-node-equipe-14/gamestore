import AppDataSource from '../../data-source';
import { Category } from '../../entities/categories.entity';
import { AppError } from '../../errors/appError';

const deleteCategoriesService = async (id: string) => {
  const categoriesRepository = AppDataSource.getRepository(Category);
  const categories = await categoriesRepository.find()
  const category   = categories.find(category => category.id === id)


  if (!category) {
    throw new AppError('Category not found', 404);
  }

  await categoriesRepository.delete(category)

};

export default deleteCategoriesService;
