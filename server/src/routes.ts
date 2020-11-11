import { Router } from 'express';

import MovementsController from './controllers/MovementsController';
import CategoriesController from './controllers/CategoriesController';
import BalanceByNameController from './controllers/BalanceByNameController';
import BalanceByCategoryController from './controllers/BalanceByCategoryController';

const movementsController = new MovementsController();
const categoriesController = new CategoriesController();
const balanceByName = new BalanceByNameController();
const balanceByCategory = new BalanceByCategoryController();

const routes = Router();

routes.post('/movements', movementsController.create);
routes.get('/movements', movementsController.index);

routes.post('/categories', categoriesController.create);
routes.get('/categories', categoriesController.index);

routes.get('/balance/name', balanceByName.index);
routes.get('/balance/category', balanceByCategory.index);

export default routes;
