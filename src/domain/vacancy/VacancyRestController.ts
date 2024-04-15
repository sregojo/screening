import { Request, Response } from 'express';
import { ExpressRestControllerBase } from '../../application/base/RestControllerBase';
import { VacancyRepositoryPort } from './VacancyRepositoryPort';
import { CompanyIdentitySchema } from '../company/CompanyModel';
import { VacancyDataSchema } from './VacancyModel';
import { PaginationSchema } from '../../application/base/PaginationModel';

export class VacancyRestController extends ExpressRestControllerBase {
    constructor(public readonly repository: VacancyRepositoryPort) {
        super();
    }

    public override async Post(req: Request, res: Response): Promise<Response> {
        const company = CompanyIdentitySchema.validate(req.params);
        if (company.error) {
          return res.status(400).send(company.error.message);
        }

        const data = VacancyDataSchema.validate(req.body);
        if (data.error) {
          return res.status(400).send(data.error.message);
        }


        const result = await this.repository.Create(company.value, data.value);
        return res.status(200).send(result);
    }

    public override async Get(req: Request, res: Response): Promise<Response> {
        const company = CompanyIdentitySchema.validate(req.params);
        if (company.error) {
          return res.status(400).send(company.error.message);
        }

        const pagination = PaginationSchema.validate(req.query);
        if (pagination.error) {
          return res.status(400).send(pagination.error.message);
        }

        const result = await this.repository.Get(company.value, pagination.value);
        return res.status(200).send(result);
    }
}