import Joi from "joi";
import { ProfileFootPrint, QuestionResponse, QuestionResponseSchema } from "../screening/ScreningModel";
import mongoose from "mongoose";
import { JoiExtensions } from "../../application/base/Extensions";

export interface VacancyIdentity {
    companyId: mongoose.ObjectId;
    vacancyId: mongoose.ObjectId;
}

export interface VacancyData {
    companyId: mongoose.ObjectId;
    title: string;
    profile: QuestionResponse[]
}

export interface VacancyEntity extends VacancyIdentity, VacancyData { }

export interface VacancyDocument extends VacancyEntity, ProfileFootPrint { }

export const VacancyIdentitySchema = Joi.object<VacancyIdentity>({
    companyId: JoiExtensions.MongoDbObjectId,
    vacancyId: JoiExtensions.MongoDbObjectId,
});

export const VacancyDataSchema = Joi.object<VacancyData>({
    companyId: JoiExtensions.MongoDbObjectId,
    title: Joi.string().min(2).max(50).required(),
    profile: Joi.array().items(QuestionResponseSchema)
});


export const VacancyDocumentSchema = JoiExtensions.EntityDocumentSchema(
    "vacancyId",
    new mongoose.Schema<VacancyDocument>({
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            index: true
        },
        title: {
            type: String,
            required: true
        },
        profile: [{ 
            questionId: {
                type: String,
                required: true
            },
            responseId: {
                type: String,
                required: true
            }}],
        profileFootPrint: [{
            type: BigInt,
            required: true,
            index: true,
            }]
        }),
    );
