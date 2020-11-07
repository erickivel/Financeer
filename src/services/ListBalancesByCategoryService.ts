import { getCustomRepository } from 'typeorm';

import MovementsRepository from '../repositories/MovementsRepository';

interface CategoryBalance {
  category_name: string | undefined;
  total_value_invested: number;
  category_percentage: number;
}

class ListBalancesByCategoryService {
  public async execute(): Promise<CategoryBalance[]> {
    const movementsRepository = getCustomRepository(MovementsRepository);

    const movementsWithCategory = await movementsRepository.findWithCategory();

    const movementsCategories = movementsWithCategory.map(movement => {
      return movement.category?.name;
    });

    const movementsWithoutDuplicateCategories = movementsCategories.filter(
      (category_name, index) =>
        movementsCategories.indexOf(category_name) === index,
    );

    const categoriesBalance = movementsWithoutDuplicateCategories.map(
      category_name => {
        const movementsFilteredByCategory = movementsWithCategory.filter(
          movement => movement.category?.name === category_name,
        );

        const total_value_invested = movementsFilteredByCategory.reduce(
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

        return {
          category_name,
          total_value_invested,
        };
      },
    );

    const categoriesBalanceWithPercentage = categoriesBalance.map(
      category_balance => {
        const numerator = category_balance.total_value_invested;

        const denominator = categoriesBalance.reduce(
          (prevTotal, currBalance) => {
            return prevTotal + currBalance.total_value_invested;
          },
          0,
        );

        const category_percentage = numerator / denominator;

        return {
          ...category_balance,
          category_percentage,
        };
      },
    );

    return categoriesBalanceWithPercentage;
  }
}

export default ListBalancesByCategoryService;
