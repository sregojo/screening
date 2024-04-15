import Joi from "joi";
import mongoose from "mongoose";
import { JoiExtensions } from "../../application/base/Extensions";

export interface CompanyIdentity {
    companyId: mongoose.Types.ObjectId;
}

export interface CompanyData {
    name: string;
}

export interface CompanyEntity extends CompanyIdentity, CompanyData { }

export const CompanyIdentitySchema = Joi.object<CompanyIdentity>({
    companyId: JoiExtensions.MongoDbObjectId,
});

export const CompanyDataSchema = Joi.object<CompanyData>({
    name: Joi.string().min(2).max(50).required(),
});

export const CompanyDocumentSchema = JoiExtensions.EntityDocumentSchema(
    "companyId",
    new mongoose.Schema<CompanyEntity>({
        name: {
            type: String,
            required: true
        }
    })
);