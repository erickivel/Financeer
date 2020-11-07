import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

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

    if (!category_id) {
      throw new AppError('category_id not defined.', 400);
    }

    const hasCategory = await categoriesRepository.findOne({
      where: { id: category_id },
    });

    if (!hasCategory) {
      throw new AppError('Category not found.', 400);
    }

    const amountVaryByCategory = amount || 1;

    const parsedDate = new Date(movement_date);

    const movement = movementsRepository.create({
      product_name,
      category_id,
      movement_date: parsedDate,
      financial_institution,
      value_applied: Number(value_applied),
      movement_type,
      amount: amountVaryByCategory,
    });

    await movementsRepository.save(movement);

    return movement;
  }
}

export default CreateMovementService;
