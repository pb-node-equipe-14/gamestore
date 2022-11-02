import { Category } from '../category';
export interface IGamesrequest {
  name: string;
  price: number;
  age: number;
  launch: string;
  description: string;
  developer: string;
  image: string;
  // id_categoryId: Category;
}
