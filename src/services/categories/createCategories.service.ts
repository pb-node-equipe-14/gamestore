import AppDataSource from '../../data-source';
import { Category } from '../../entities/categories.entity';
import { AppError } from '../../errors/appError';
import { ICategoryRequest } from '../../interfaces/categories';

const createCategoriesService = async ({
  name,
}: ICategoryRequest): Promise<Category> => {
  const categorieRepository = AppDataSource.getRepository(Category);

  const findCategory = await categorieRepository.findOneBy({
    name: name,
  });

  if (findCategory) {
    throw new AppError('Category already exists', 400);
  }

  const newCategory = categorieRepository.create({
    name,
  });

  await categorieRepository.save(newCategory);

  return newCategory;
};

export default createCategoriesService;
