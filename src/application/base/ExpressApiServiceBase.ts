import express, { Router } from 'express';
import * as http from 'http'
import bodyParser from 'body-parser'

export type Configuration = {
    Api: { Path: string; Port: number };
    MongoDb: { connectionString: string; };
}

export abstract class ExpressApiServiceBase<TControllers> {
    private express = express();
    protected readonly router = express.Router();
    private httpServer: http.Server | undefined;

    constructor(public readonly configuration: Configuration) {
        ((BigInt.prototype) as any).toJSON = function() { return this.toString(); };
    }

    public Start(): void {
        if(!this.httpServer) {
            this.express.use(bodyParser.json());
            this.express.use(
                this.configuration.Api.Path,
                this.Routes(
                    this.Controllers(this.configuration)));
    
            this.httpServer = this.express.listen(this.configuration.Api.Port, () => {
                console.log(`Server running: http://localhost:${this.configuration.Api.Port}${this.configuration.Api.Path}`);
              });
        }
    }

    public Stop(): void {
        if(this.httpServer) {
            this.httpServer.close();
            this.httpServer = undefined;
            console.log(`Server stopped: http://localhost:${this.configuration.Api.Port}${this.configuration.Api.Path}`);
        }
    }

    protected abstract Controllers(configuration: Configuration):  TControllers;
    protected abstract Routes(controllers: TControllers): Router;    
}


