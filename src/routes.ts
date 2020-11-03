import { Router } from 'express';

import ApplicationProductsController from './controllers/ApplicationProductsController';

const routes = Router();

routes.post('/application-products', ApplicationProductsController.create);

export default routes;
