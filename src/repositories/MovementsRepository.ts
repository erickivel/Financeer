import { EntityRepository, Repository } from 'typeorm';

import Movement from '../models/Movement';

@EntityRepository(Movement)
class MovementsRepository extends Repository<Movement> {}

export default MovementsRepository;
