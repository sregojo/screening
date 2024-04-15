import { Request, Response } from 'express';
import { ExpressRestControllerBase } from '../../application/base/RestControllerBase';
import { ScreeningResultRepositoryPort } from './ScreeningResultRepositoryPort';
import { ScreeningIdentitySchema } from './ScreningModel';

export class ScreeningResultRestController extends ExpressRestControllerBase {
    constructor(private readonly repository: ScreeningResultRepositoryPort) {
        super();
    }

    public async Get(req: Request, res: Response):  Promise<Response> {         
        const screening = ScreeningIdentitySchema.validate(req.params);
        if (screening.error) {
          return res.status(400).send(screening.error.message);
        }

        const result = await this.repository.Get(screening.value);
        return res.status(200).send(result);
    }
}
