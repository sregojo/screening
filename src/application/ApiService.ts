import mongoose from 'mongoose';
import { Router } from 'express';
import { Configuration, ExpressApiServiceBase } from './base/ExpressApiServiceBase';
import { HealthCheckController } from './HealthCheckController';
import { ApplicantRestController } from '../domain/applicant/ApplicantRestController';
import { ApplicantMongDbRepositoryAdapter } from '../domain/applicant/ApplicantMongDbRepositoryAdapter';
import { CompanyRestController } from '../domain/company/CompanyRestController';
import { CompanyMongDbRepositoryAdapter } from '../domain/company/CompanyMongDbRepositoryAdapter';
import { QuestionMongDbRepositoryAdapter } from '../domain/question/QuestionMongDbRepositoryAdapter';
import { VacancyRestController } from '../domain/vacancy/VacancyRestController';
import { VacancyMongDbRepositoryAdapter } from '../domain/vacancy/VacancyMongDbRepositoryAdapter';
import { QuestionRestController } from '../domain/question/QuestionRestController';
import { ScreeningRestController } from '../domain/screening/ScreeningRestController';
import { ScreeningResultRestController } from '../domain/screening/ScreeningResultRestController';
import { ScreeningResultMongDbRepositoryAdapter } from '../domain/screening/ScreeningResultMongDbRepositoryAdapter';
import { ExpressRestController } from './base/RestControllerBase';

type Controllers = {
    healthCheck: HealthCheckController;
    applicant: ExpressRestController;
    company: ExpressRestController;
    question: ExpressRestController;
    vacancy: ExpressRestController;
    screening: ExpressRestController;
    screeningResult: ExpressRestController
};

export class ApiService extends ExpressApiServiceBase<Controllers> {
    Controllers(configuration: Configuration): Controllers {
        // TODO: Add a proper DI
        // Archaic Dependency injection, it isolates the usage of 'new' sentences in the rest of teh app allowing interface based ctor parameters

        const connection = mongoose.createConnection(configuration.MongoDb.connectionString);
        const applicantRepository = new ApplicantMongDbRepositoryAdapter(connection);

        return {
            healthCheck: new HealthCheckController(connection),
            applicant: new ApplicantRestController(applicantRepository),
            screening: new ScreeningRestController(applicantRepository),
            screeningResult: new ScreeningResultRestController(new ScreeningResultMongDbRepositoryAdapter(connection)),
            company: new CompanyRestController(new CompanyMongDbRepositoryAdapter(connection)),
            question: new QuestionRestController(new QuestionMongDbRepositoryAdapter(connection)),
            vacancy: new VacancyRestController(new VacancyMongDbRepositoryAdapter(connection)),
        }
    }

    Routes(controllers: Controllers): Router {
        this.router.get('/health/ready', controllers.healthCheck.GetReady);
        this.router.get('/health/live', controllers.healthCheck.GetLive);

        this.router.post('/applicants', controllers.applicant.Post);
        this.router.get('/applicants', controllers.applicant.Get);

        this.router.post('/companies', controllers.company.Post);
        this.router.get('/companies', controllers.company.Get);
        
        this.router.post('/companies/:companyId/vacancies', controllers.vacancy.Post);
        this.router.get('/companies/:companyId/vacancies', controllers.vacancy.Get);
           
        this.router.post('/companies/:companyId/questions', controllers.question.Post);
        this.router.get('/companies/:companyId/questions', controllers.question.Get);

        this.router.post('/companies/:companyId/screening/:applicantId/questions/:questionId', controllers.screening.Post);
        this.router.get('/companies/:companyId/screening/:applicantId/', controllers.screeningResult.Get);

        return this.router;
    }
}
