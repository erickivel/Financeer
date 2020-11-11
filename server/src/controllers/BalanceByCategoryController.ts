import { Response, Request } from 'express';

import ListBalancesByCategoryService from '../services/ListBalancesByCategoryService';

class BalanceByCategoryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listBalancesByCategory = new ListBalancesByCategoryService();

    const balancesByCategory = await listBalancesByCategory.execute();

    return response.json(balancesByCategory);
  }
}

export default BalanceByCategoryController;
