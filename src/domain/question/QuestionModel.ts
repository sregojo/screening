import Joi from "joi";
import mongoose, { Schema } from "mongoose";
import { JoiExtensions } from "../../application/base/Extensions";
import { CompanyIdentity } from "../company/CompanyModel";

export interface QuestionIdentity {
    companyId: mongoose.Types.ObjectId;
    questionId: mongoose.Types.ObjectId;
}

interface Response {
    title: string;
}

export interface QuestionData {
    companyId: mongoose.Types.ObjectId;
    title: string;
    responses: Response[]
}

export interface QuestionEntity extends QuestionIdentity, QuestionData {}

export const QuestionIdentitySchema = Joi.object<QuestionIdentity>({
    companyId: JoiExtensions.MongoDbObjectId,
    questionId: JoiExtensions.MongoDbObjectId,
});

const ResponseSchema = Joi.object<Response>({
    title: Joi.string().min(2).max(100).required(),
});

export const QuestionDataSchema = Joi.object<QuestionData & CompanyIdentity>({
    companyId: JoiExtensions.MongoDbObjectId,
    title: Joi.string().min(2).max(300).required(),
    responses: Joi.array().items(ResponseSchema)
});

export const QuestionDocumentSchema = JoiExtensions.EntityDocumentSchema(
    "questionId",
    new mongoose.Schema<QuestionEntity>({
        companyId: {
            type: Schema.Types.ObjectId,
            required: true, index: true
          },
        title: {
            type: String,
            required: true
          },
        responses: [{ 
            title: {
                type: String,
                required: true
            }}]
        })
    );