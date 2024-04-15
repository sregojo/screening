import { v4 } from "uuid";
import mongoose, { Model } from 'mongoose';
import { ApplicantRepositoryPort } from "./ApplicantRepositoryPort";
import { ApplicantData, ApplicantDocument, ApplicantDocumentSchema, ApplicantEntity } from "./ApplicantModel";
import { Pagination } from "../../application/base/PaginationModel";
import { QuestionResponse } from "../screening/ScreningModel";
import { HashExtensions } from "../../application/base/Extensions";

export class ApplicantMongDbRepositoryAdapter implements ApplicantRepositoryPort {

    private readonly ApplicantModel: Model<ApplicantDocument>;

    constructor(private readonly connection: mongoose.Connection) {
        this.ApplicantModel = this.connection.model<ApplicantDocument>('Applicant', ApplicantDocumentSchema);
    }

    async Create(data: ApplicantData): Promise<ApplicantEntity> {
        const document = new this.ApplicantModel(data);
        const result = await document.save();

        return result;
    }

    async Get(pagination: Pagination): Promise<ApplicantEntity[]> {
        const documents = await this.ApplicantModel
            .find()
            .skip(pagination.start)
            .limit(pagination.limit)
            .exec();
        
        return documents;
    }

    async UpsertProfile(applicantId: mongoose.Types.ObjectId, response: QuestionResponse): Promise<void> {
        const responseFootprint = HashExtensions.BigIntHash([
            response.questionId.toString(),
            response.responseId.toString()]);

        const document = await this.ApplicantModel.findByIdAndUpdate(
            applicantId,
            { $push: { profile: response, profileFootPrint: responseFootprint }});
    }
}
