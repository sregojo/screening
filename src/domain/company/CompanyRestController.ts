import { Request, Response } from 'express';
import { CompanyDataSchema } from './CompanyModel';
import { CompanyRepositoryPort } from './CompanyRepositoryPort';
import { ExpressRestControllerBase } from '../../application/base/RestControllerBase';
import { PaginationSchema } from '../../application/base/PaginationModel';

export class CompanyRestController extends ExpressRestControllerBase {
    constructor(private readonly repository: CompanyRepositoryPort) {
        super();
    }

    async Post(req: Request, res: Response):  Promise<Response> {
        const data = CompanyDataSchema.validate(req.body);
        if (data.error) {
          return res.status(400).send(data.error.message);
        }

        const result = await this.repository.Create(data.value);
        return res.status(200).send(result);
    }

    async Get(req: Request, res: Response):  Promise<Response>  {
        const pagination = PaginationSchema.validate(req.query);
        if (pagination.error) {
          return res.status(400).send(pagination.error.message);
        }
        
        const result = await this.repository.Get(pagination.value);

        return res.status(200).json(result);
    }
}