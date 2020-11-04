import { Router } from 'express';

import MovementsController from './controllers/MovementsController';

const movementsController = new MovementsController();

const routes = Router();

routes.post('/movements', movementsController.create);

export default routes;
