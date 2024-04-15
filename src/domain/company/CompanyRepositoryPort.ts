import { Pagination } from "../../application/base/PaginationModel";
import { CompanyData, CompanyEntity } from "./CompanyModel";

export interface CompanyRepositoryPort {
    Create(data: CompanyData): Promise<CompanyEntity>;
    Get(pagination: Pagination): Promise<CompanyEntity[]>;
}