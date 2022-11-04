import AppDataSource from '../../data-source';
import { Category } from '../../entities/categories.entity';

const listCategoriesService = async (): Promise<Category[]> => {
  const categorieRepository = AppDataSource.getRepository(Category);

  const listCategories = await categorieRepository.find();

  return listCategories;
};

export default listCategoriesService
