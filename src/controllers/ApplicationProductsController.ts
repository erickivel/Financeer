import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

import ApplicationProduct from '../models/ApplicationProducts';

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      product_name,
      first_application_date,
      financial_institution,
      value_applied,
      movement_type,
      amount,
    } = request.body;

    const applicationProductsRepository = getRepository(ApplicationProduct);

    const applicationProduct = applicationProductsRepository.create({
      product_name,
      first_application_date,
      financial_institution,
      value_applied,
      movement_type,
      amount,
    });

    await applicationProductsRepository.save(applicationProduct);

    return response.json(applicationProduct);
  },
};
