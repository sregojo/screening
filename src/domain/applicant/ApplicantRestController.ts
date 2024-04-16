import { Request, Response } from 'express';
import { ApplicantDataSchema } from './ApplicantModel';
import { ApplicantRepositoryPort } from './ApplicantRepositoryPort';
import { ExpressRestControllerBase } from '../../application/base/RestControllerBase';
import { PaginationSchema } from '../../application/base/PaginationModel';

export class ApplicantRestController extends ExpressRestControllerBase {
    constructor(private readonly repository: ApplicantRepositoryPort) {
        super();
    }

    public async Post(req: Request, res: Response):  Promise<Response> {
        const data = ApplicantDataSchema.validate(req.body);
        if (data.error) {
          return res.status(400).send(data.error.message);
        }

        const result = await this.repository.Create(data.value);
        return res.status(200).send(result);
    }

    public async Get(req: Request, res: Response): Promise<Response> {
        const pagination = PaginationSchema.validate(req.query);
        if (pagination.error) {
          return res.status(400).send(pagination.error.message);
        }

        const result = await this.repository.Get(pagination.value);

        return res.status(200).json(result);
    }
}
