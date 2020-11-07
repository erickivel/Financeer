import { Router } from 'express';

import MovementsController from './controllers/MovementsController';
import CategoriesController from './controllers/CategoriesController';
import BalanceByNameController from './controllers/BalanceByNameController';

const movementsController = new MovementsController();
const categoriesController = new CategoriesController();
const balanceByName = new BalanceByNameController();

const routes = Router();

routes.post('/movements', movementsController.create);
routes.get('/movements', movementsController.index);

routes.post('/categories', categoriesController.create);
routes.get('/categories', categoriesController.index);

routes.get('/balance/name', balanceByName.index);

export default routes;
