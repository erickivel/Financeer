import { getCustomRepository } from 'typeorm';

import MovementsRepository from '../repositories/MovementsRepository';

interface MovementBalanceByName {
  product_name: string;
  total_value_invested: number;
  total_amount: number;
}

class ListBalanceByMovementsNameService {
  public async execute(): Promise<MovementBalanceByName[]> {
    const movementsRepository = getCustomRepository(MovementsRepository);

    const movementsWithCategory = await movementsRepository.findWithCategory();

    const movementsNames = movementsWithCategory.map(
      movement => movement.product_name,
    );

    const movementsWithoutDuplicateNames = movementsNames.filter(
      (product_name, index) => movementsNames.indexOf(product_name) === index,
    );

    const movementsBalancesByName = movementsWithoutDuplicateNames.map(
      product_name => {
        const movementsFilteredByName = movementsWithCategory.filter(
          movement => movement.product_name === product_name,
        );

        const total_value_invested = movementsFilteredByName.reduce(
          (prevValueApplied, currMovement) => {
            return (
              Math.round(
                (Number(currMovement.value_applied) + prevValueApplied) * 100,
              ) / 100
            );
          },
          0,
        );

        const total_amount = movementsFilteredByName.reduce(
          (prevAmount, currMovement) => {
            return currMovement.amount + prevAmount;
          },
          0,
        );

        return {
          product_name,
          total_value_invested,
          total_amount,
        };
      },
    );

    return movementsBalancesByName;
  }
}

export default ListBalanceByMovementsNameService;
