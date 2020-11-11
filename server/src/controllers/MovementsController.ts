import { Request, Response } from 'express';

import CreateMovementService from '../services/CreateMovementService';
import ListMovementsService from '../services/ListMovementsService';

export default class MovementsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      product_name,
      category_id,
      movement_date,
      financial_institution,
      movement_value,
      movement_type,
      amount,
    } = request.body;

    const createMovement = new CreateMovementService();

    const movement = await createMovement.execute({
      product_name,
      category_id,
      movement_date,
      financial_institution,
      movement_value,
      movement_type,
      amount,
    });

    return response.json(movement);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listMovementsService = new ListMovementsService();

    const movementsWithCategory = await listMovementsService.execute();

    return response.json(movementsWithCategory);
  }
}
