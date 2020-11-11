import { getRepository } from 'typeorm';

import Category from '../models/Category';

class ListCategoriesService {
  public async execute(): Promise<Category[]> {
    const categoriesRepository = getRepository(Category);

    const categories = await categoriesRepository.find();

    return categories;
  }
}

export default ListCategoriesService;
