import { Request, Response } from 'express';

import CreateMovementService from '../services/CreateMovementService';

export default class MovementsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      product_name,
      category_id,
      movement_date,
      financial_institution,
      value_applied,
      movement_type,
      amount,
    } = request.body;

    const createMovement = new CreateMovementService();

    const movement = await createMovement.execute({
      product_name,
      category_id,
      movement_date,
      financial_institution,
      value_applied,
      movement_type,
      amount,
    });

    return response.json(movement);
  }
}
