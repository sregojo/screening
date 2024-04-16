import mongoose from 'mongoose';
import { ScreeningResultRepositoryPort } from './ScreeningResultRepositoryPort';
import { VacancyDocument, VacancyDocumentSchema } from '../vacancy/VacancyModel';
import { ApplicantDocument, ApplicantDocumentSchema, ApplicantIdentity } from '../applicant/ApplicantModel';
import { ScreeningIdentity, ScreeningResult } from './ScreningModel';

export class ScreeningResultMongDbRepositoryAdapter implements ScreeningResultRepositoryPort {
    constructor(private readonly connection: mongoose.Connection) { }

    async Get(screening: ScreeningIdentity): Promise<ScreeningResult[]> {
        const applicantModel = this.connection.model<ApplicantDocument>('Applicant', ApplicantDocumentSchema);
        const applicant = await applicantModel.findById(screening.applicantId).populate("profileFootPrint");
        if(applicant) {
            const vacancyModel = this.connection.model<VacancyDocument>('Vacancy', VacancyDocumentSchema);
            
            const result = await vacancyModel
                .aggregate(
                [
                    { $project: { title:1, eligible: { $setIsSubset: [ "$profileFootPrint", applicant.profileFootPrint ] }, _id:0 } }
                ]
            ).exec();
    
            return result;
        }

        return [];
    }
}
