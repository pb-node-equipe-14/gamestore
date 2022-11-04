import AppDataSource from '../../data-source';
import { Category } from '../../entities/categories.entity';

const deleteCategoriesService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(Category);

  const findUser = await userRepository.findOneBy({
    id,
  });

  if (!findUser) {
    throw new Error('User not found');
  }
};

export default deleteCategoriesService;
