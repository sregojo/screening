import mongoose, { Model, Schema } from 'mongoose';
import { CompanyIdentity } from '../company/CompanyModel';
import { QuestionData, QuestionDocumentSchema, QuestionEntity } from './QuestionModel';
import { QuestionRepositoryPort } from './QuestionRepositoryPort';
import { Pagination } from '../../application/base/PaginationModel';

export class QuestionMongDbRepositoryAdapter implements QuestionRepositoryPort {

    private readonly model: Model<QuestionEntity>;

    constructor(private readonly connection: mongoose.Connection) {
        this.model = this.connection.model<QuestionEntity>('Question', QuestionDocumentSchema);
    }

    async Create(company: CompanyIdentity, data: QuestionData): Promise<QuestionEntity> {

        const document = new this.model({...company, ...data });
        const result = await document.save();

        return result;
    }

    async Get(company: CompanyIdentity, pagination: Pagination): Promise<QuestionEntity[]> {
        const documents = await this.model
            .find()
            .skip(pagination.start)
            .limit(pagination.limit)            
            .where('companyId').equals(company.companyId)
            .exec();
        
        return documents;
    }
}
