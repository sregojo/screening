import Joi from "joi";
import mongoose from "mongoose";
import { JoiExtensions } from "../../application/base/Extensions";

export interface ScreeningIdentity {
    companyId: mongoose.Types.ObjectId;
    applicantId: mongoose.Types.ObjectId;
}

export interface ResponseIdentity {
    companyId: mongoose.Types.ObjectId;
    questionId: mongoose.Types.ObjectId;
    applicantId: mongoose.Types.ObjectId;
}

export interface ResponseData { responseId: mongoose.Types.ObjectId }

export interface ResponseEntity extends ResponseIdentity, ResponseData { }

export interface ProfileFootPrint {
    profileFootPrint: BigInt[]
}

export const ScreeningIdentitySchema = Joi.object<ScreeningIdentity>({
    companyId: JoiExtensions.MongoDbObjectId,
    applicantId: JoiExtensions.MongoDbObjectId,
});

export const ResponseIdentitySchema = Joi.object<ResponseIdentity>({
    companyId: JoiExtensions.MongoDbObjectId,
    questionId: JoiExtensions.MongoDbObjectId,
    applicantId: JoiExtensions.MongoDbObjectId,
});

export const ResponseDataSchema = Joi.object<ResponseData>({
    responseId: JoiExtensions.MongoDbObjectId,
});


export interface QuestionResponse { 
    questionId: mongoose.Types.ObjectId, 
    responseId: mongoose.Types.ObjectId
}

export const QuestionResponseSchema = Joi.object<QuestionResponse>({
    questionId: JoiExtensions.MongoDbObjectId,
    responseId: JoiExtensions.MongoDbObjectId,
});
