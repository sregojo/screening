import { v4 } from "uuid";
import mongoose, { Model } from 'mongoose';
import { CompanyData, CompanyDocumentSchema, CompanyEntity } from "./CompanyModel";
import { CompanyRepositoryPort } from "./CompanyRepositoryPort";
import { Pagination } from "../../application/base/PaginationModel";

export class CompanyMongDbRepositoryAdapter implements CompanyRepositoryPort {

    private readonly CompanyModel: Model<CompanyEntity>;

    constructor(private readonly connection: mongoose.Connection) {
        this.CompanyModel = this.connection.model<CompanyEntity>('Company', CompanyDocumentSchema);
    }

    async Create(data: CompanyData): Promise<CompanyEntity> {
        const document = new this.CompanyModel(data);
        const result = await document.save();

        return result;
    }

    async Get(pagination: Pagination): Promise<CompanyEntity[]> {
        const documents = await this.CompanyModel
            .find()
            .skip(pagination.start)
            .limit(pagination.limit)            
            .exec();
        
        return documents;
    }
}
