import { Response, Request } from 'express';

import ListBalancesByMovementNamesService from '../services/ListBalancesByMovementNamesService';

class BalanceByNameController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listBalancesByMovementNames = new ListBalancesByMovementNamesService();

    const balancesByName = await listBalancesByMovementNames.execute();

    return response.json(balancesByName);
  }
}

export default BalanceByNameController;
