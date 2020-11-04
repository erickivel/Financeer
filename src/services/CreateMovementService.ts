import { getRepository } from 'typeorm';

import Movement from '../models/Movement';
import Category from '../models/Category';

interface IRequest {
  product_name: string;
  category_id: string;
  movement_date: Date;
  financial_institution: string;
  value_applied: number;
  movement_type: 'application' | 'redemption';
  amount?: number;
}

class CreateMovementService {
  public async execute({
    product_name,
    category_id,
    movement_date,
    financial_institution,
    value_applied,
    movement_type,
    amount,
  }: IRequest): Promise<Movement> {
    const movementsRepository = getRepository(Movement);
    const categoriesRepository = getRepository(Category);

    const hasCategory = categoriesRepository.findOne({
      where: { id: category_id },
    });

    if (!hasCategory) {
      throw new Error('Category not found.');
    }

    const amountVaryByCategory = amount || 1;

    const parsedDate = new Date(movement_date);

    const movement = movementsRepository.create({
      product_name,
      category_id,
      movement_date: parsedDate,
      financial_institution,
      value_applied,
      movement_type,
      amount: amountVaryByCategory,
    });

    await movementsRepository.save(movement);

    return movement;
  }
}

export default CreateMovementService;
