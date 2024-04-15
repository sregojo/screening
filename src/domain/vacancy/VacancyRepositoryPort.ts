import { Pagination } from "../../application/base/PaginationModel";
import { CompanyIdentity } from "../company/CompanyModel";
import { VacancyData, VacancyEntity } from "./VacancyModel";

export interface VacancyRepositoryPort {
    Create(company: CompanyIdentity, data: VacancyData): Promise<VacancyEntity>;
    Get(company: CompanyIdentity, pagination: Pagination): Promise<VacancyEntity[]>;
}