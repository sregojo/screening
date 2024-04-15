import { Pagination } from "../../application/base/PaginationModel";
import { CompanyIdentity } from "../company/CompanyModel";
import { QuestionData, QuestionEntity } from "./QuestionModel";

export interface QuestionRepositoryPort {
    Create(company: CompanyIdentity, data: QuestionData): Promise<QuestionEntity>;
    Get(company: CompanyIdentity, pagination: Pagination): Promise<QuestionEntity[]>;
}