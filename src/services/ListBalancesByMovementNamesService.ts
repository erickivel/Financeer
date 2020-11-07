import { getRepository } from 'typeorm';

import Movement from '../models/Movement';

interface MovementBalanceByName {
  product_name: string;
  total_value_invested: number;
  total_amount: number;
}

class ListBalanceByMovementsNameService {
  public async execute(): Promise<MovementBalanceByName[]> {
    const movementsRepository = getRepository(Movement);

    const movementsWithCategory = await movementsRepository.find();

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
      },
    );

    return movementsBalancesByName;
  }
}

export default ListBalanceByMovementsNameService;
