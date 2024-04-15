import { Request, Response } from 'express';
import { ExpressRestControllerBase } from '../../application/base/RestControllerBase';
import { ApplicantRepositoryPort } from '../applicant/ApplicantRepositoryPort';
import { ResponseDataSchema, ResponseIdentitySchema } from './ScreningModel';

export class ScreeningRestController extends ExpressRestControllerBase {
    constructor(private readonly repository: ApplicantRepositoryPort) {
        super();
    }

    public async Post(req: Request, res: Response):  Promise<Response> {         
        const responseIdentity = ResponseIdentitySchema.validate(req.params);

        if (responseIdentity.error) {
          return res.status(400).send(responseIdentity.error.message);
        }

        const responseData = ResponseDataSchema.validate(req.body);
        if (responseData.error) {
          return res.status(400).send(responseData.error.message);
        }

        const applicantId = responseIdentity.value.applicantId;
        const questionId = responseIdentity.value.questionId;
        const responseId = responseData.value.responseId;

        const result = await this.repository.UpsertProfile(
          applicantId, 
          {
            questionId,
            responseId,
          });
        return res.status(200).send(result);
    }
}
