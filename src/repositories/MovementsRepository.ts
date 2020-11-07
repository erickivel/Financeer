import { EntityRepository, Repository, getRepository } from 'typeorm';

import Movement from '../models/Movement';
import Category from '../models/Category';

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

@EntityRepository(Movement)
class MovementsRepository extends Repository<Movement> {
  public async findWithCategory(): Promise<MovementWithCategory[]> {
    const movementsRepository = getRepository(Movement);
    const categoriesRepository = getRepository(Category);

    const movements = await movementsRepository.find();
    const categories = await categoriesRepository.find();

    const movementsWithCategory = movements.map(movement => {
      return {
        ...movement,
        movement_value: Number(movement.movement_value),
        category: categories.find(
          category => category.id === movement.category_id,
        ),
      };
    });

    return movementsWithCategory;
  }
}

export default MovementsRepository;
