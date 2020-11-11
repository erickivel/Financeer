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

interface BalanceByName {
  product_name: string;
  total_value_invested: number;
  total_amount: number;
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

  public async getAllBallancesByProductName(): Promise<BalanceByName[]> {
    const movementsRepository = getRepository(Movement);

    const movements = await movementsRepository.find();

    const movementsNames = movements.map(movement => movement.product_name);

    const movementsWithoutDuplicateNames = movementsNames.filter(
      (product_name, index) => movementsNames.indexOf(product_name) === index,
    );

    const movementsBalancesByName = movementsWithoutDuplicateNames
      .map(product_name => {
        const movementsFilteredByName = movements.filter(
          movement => movement.product_name === product_name,
        );

        const total_value_invested = movementsFilteredByName.reduce(
          (prevValueApplied, currMovement) => {
            if (currMovement.movement_type === 'redemption') {
              return (
                Math.round(
                  (prevValueApplied - Number(currMovement.movement_value)) *
                    100,
                ) / 100
              );
            }
            return (
              Math.round(
                (prevValueApplied + Number(currMovement.movement_value)) * 100,
              ) / 100
            );
          },
          0,
        );

        const total_amount = movementsFilteredByName.reduce(
          (prevAmount, currMovement) => {
            if (currMovement.movement_type === 'redemption') {
              return (
                Math.round((prevAmount - Number(currMovement.amount)) * 100) /
                100
              );
            }
            return (
              Math.round((prevAmount + Number(currMovement.amount)) * 100) / 100
            );
          },
          0,
        );

        return {
          product_name,
          total_value_invested,
          total_amount,
        };
      })
      .filter(balance => balance.total_amount > 0);

    return movementsBalancesByName;
  }
}

export default MovementsRepository;
