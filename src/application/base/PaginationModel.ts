import Joi from "joi";

export type Pagination = {
    start: number;
    limit: number;
}

export const PaginationSchema = Joi.object<Pagination>({
    start: Joi.number().greater(-1).default(0),
    limit: Joi.number().greater(0).less(1000).default(10),
});