import { getRepository } from 'typeorm';

import Category from '../models/Category';

interface IRequest {
  name: string;
}

class CreateCategoryService {
  public async execute({ name }: IRequest): Promise<Category> {
    const categioriesRepository = getRepository(Category);

    const category = categioriesRepository.create({ name });

    await categioriesRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
