import { Request, Response } from 'express';

import CreateCategoryService from '../services/CreateCategoryService';
import ListCategoriesService from '../services/ListCategoriesService';

class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategory = new CreateCategoryService();

    const category = await createCategory.execute({ name });

    return response.json(category);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listCategories = new ListCategoriesService();

    const categories = await listCategories.execute();

    return response.json(categories);
  }
}

export default CategoriesController;
