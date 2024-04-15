import mongoose from "mongoose";
import { Pagination } from "../../application/base/PaginationModel";
import { QuestionResponse } from "../screening/ScreningModel";
import { ApplicantData, ApplicantEntity } from "./ApplicantModel";

export interface ApplicantRepositoryPort {
    Create(data: ApplicantData): Promise<ApplicantEntity>;
    Get(pagination: Pagination): Promise<ApplicantEntity[]>;
    UpsertProfile(applicantId: mongoose.Types.ObjectId, response: QuestionResponse): Promise<void>;
}