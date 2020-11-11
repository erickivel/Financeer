import { getCustomRepository } from 'typeorm';

import MovementsRepository from '../repositories/MovementsRepository';

interface BalanceByName {
  product_name: string;
  total_value_invested: number;
  total_amount: number;
}
class ListBalanceByMovementsNameService {
  public async execute(): Promise<BalanceByName[]> {
    const movementsRepository = getCustomRepository(MovementsRepository);

    const balancesByName = await movementsRepository.getAllBallancesByProductName();

    return balancesByName;
  }
}

export default ListBalanceByMovementsNameService;
