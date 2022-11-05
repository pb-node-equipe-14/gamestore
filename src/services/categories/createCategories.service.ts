import AppDataSource from '../../data-source';
import { Category } from '../../entities/categories.entity';
import { AppError } from '../../errors/appError';
import { ICategoryRequest } from '../../interfaces/categories';

const createCategoriesService = async ({
  name,
}: ICategoryRequest): Promise<Category> => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const findCategory = await categoryRepository.findOneBy({
    name: name,
  });

  if (findCategory) {
    throw new AppError('Category already exists', 400);
  }

  const newCategory = await categoryRepository.save({ name });

  return newCategory;
};

export default createCategoriesService;
