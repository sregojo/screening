import { Request, Response } from 'express';
import mongoose from 'mongoose';

export class HealthCheckController {
    constructor(private readonly connection: mongoose.Connection) { }

    public GetReady(req: Request, res: Response): Response {
        switch(this.connection.readyState) {
            case mongoose.ConnectionStates.connected:
                return res.status(200).send(req.body);
            default:
                return res.status(500).send({ resource: 'MongoDb.Connection', status: this.connection.readyState});
        }   
    }

    public GetLive(req: Request, res: Response): Response {
        switch(this.connection.readyState) {
            case mongoose.ConnectionStates.connecting:
            case mongoose.ConnectionStates.connected:
                return res.status(200).send(req.body);
            default:
                return res.status(500).send({ resource: 'MongoDb.Connection', status: this.connection.readyState});
        }        
    }
}