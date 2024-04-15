import mongoose, { Model } from 'mongoose';
import { CompanyIdentity } from '../company/CompanyModel';
import { VacancyRepositoryPort } from './VacancyRepositoryPort';
import { VacancyData, VacancyDocument, VacancyDocumentSchema, VacancyEntity } from './VacancyModel';
import { Pagination } from '../../application/base/PaginationModel';
import { HashExtensions } from '../../application/base/Extensions';

export class VacancyMongDbRepositoryAdapter implements VacancyRepositoryPort {

    private readonly model: Model<VacancyDocument>;

    constructor(private readonly connection: mongoose.Connection) {
        this.model = this.connection.model<VacancyDocument>('Vacancy', VacancyDocumentSchema);
    }

    async Create(company: CompanyIdentity, data: VacancyData): Promise<VacancyEntity> {
        const profileFootPrint = data.profile.map((item) => 
            HashExtensions.BigIntHash([item.questionId.toString(), item.responseId.toString()]));

        const document = new this.model({...company, ...data, profileFootPrint});
        const result = await document.save();

        return result;
    }

    async Get(company: CompanyIdentity, pagination: Pagination): Promise<VacancyEntity[]> {
        const documents = await this.model
            .find()
            .skip(pagination.start)
            .limit(pagination.limit)            
            .where('companyId').equals(company.companyId)
            .exec();
        
        return documents;
    }
}
