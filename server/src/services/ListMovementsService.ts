import { getCustomRepository } from 'typeorm';

import Category from '../models/Category';
import MovementsRepository from '../repositories/MovementsRepository';

interface MovementWithCategory {
  product_name: string;
  category_id: string;
  movement_date: Date;
  financial_institution: string;
  movement_value: number;
  movement_type: 'application' | 'redemption';
  amount: number;
  category: Category | undefined;
}

class ListMovementsService {
  public async execute(): Promise<MovementWithCategory[]> {
    const movementsRepository = getCustomRepository(MovementsRepository);

    const movementsWithCategory = await movementsRepository.findWithCategory();

    return movementsWithCategory;
  }
}

export default ListMovementsService;
