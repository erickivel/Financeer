import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Movement from '../models/Movement';
import Category from '../models/Category';

interface IRequest {
  product_name: string;
  category_id: string;
  movement_date: Date;
  financial_institution: string;
  movement_value: number;
  movement_type: 'application' | 'redemption';
  amount: number;
}

class CreateMovementService {
  public async execute({
    product_name,
    category_id,
    movement_date,
    financial_institution,
    movement_value,
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

    const movements = await movementsRepository.find({
      where: { product_name },
    });

    const productTotalAmount = movements.reduce((prevValue, currMovement) => {
      if (currMovement.movement_type === 'redemption') {
        return (
          Math.round((prevValue - Number(currMovement.amount)) * 100) / 100
        );
      }
      return Math.round((prevValue + Number(currMovement.amount)) * 100) / 100;
    }, 0);

    if (amount <= 0) {
      throw new AppError('The amount must be greater than 0', 400);
    }

    if (productTotalAmount < amount && movement_type === 'redemption') {
      throw new AppError(
        'The total value of the amount is less than the redemption',
        400,
      );
    }

    const parsedDate = new Date(movement_date);

    const movement = movementsRepository.create({
      product_name,
      category_id,
      movement_date: parsedDate,
      financial_institution,
      movement_value: Number(movement_value),
      movement_type,
      amount,
    });

    await movementsRepository.save(movement);

    return movement;
  }
}

export default CreateMovementService;
