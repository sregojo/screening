import Joi from "joi";
import { ProfileFootPrint, QuestionResponse, QuestionResponseSchema } from "../screening/ScreningModel";
import { JoiExtensions } from "../../application/base/Extensions";
import mongoose from "mongoose";

export interface ApplicantIdentity {
    applicantId: mongoose.Types.ObjectId;
}

export interface ApplicantData {
    name: string;
    email: string;
    profile: QuestionResponse[]
}

export interface ApplicantEntity extends ApplicantIdentity, ApplicantData { }

export interface ApplicantDocument extends ApplicantEntity, ProfileFootPrint { }


export const ApplicantIdentitySchema = Joi.object<ApplicantIdentity>({
    applicantId: JoiExtensions.MongoDbObjectId,
});

export const ApplicantDataSchema = Joi.object<ApplicantData>({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    profile: Joi.array().items(QuestionResponseSchema)
});

export const ApplicantDocumentSchema = JoiExtensions.EntityDocumentSchema(
    "applicantId",
    new mongoose.Schema<ApplicantDocument>({
        name: {
            type: String,
            required: true
          },
        email: {
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
            required: true 
        }]
    })
);
