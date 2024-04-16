import { Request, Response } from 'express';

export interface ExpressRestController {
    Post(req: Request, res: Response):  Promise<Response>;
    Put(req: Request, res: Response): Promise<Response>;
    Get(req: Request, res: Response): Promise<Response>;
    Delete(req: Request, res: Response): Promise<Response>;
}

export abstract class ExpressRestControllerBase implements ExpressRestController {
    constructor() {
        // TODO: Needed to use the instance of the class in express router
        this.Post = this.Post.bind(this);
        this.Put = this.Put.bind(this);
        this.Get = this.Get.bind(this);
        this.Delete = this.Put.bind(this);
    }


    public async Post(req: Request, res: Response):  Promise<Response> {      
        return res.status(404).send();
    }

    public async Put(req: Request, res: Response): Promise<Response> {
        return res.status(404).send();
    }

    public async Get(req: Request, res: Response): Promise<Response> {
        return res.status(400).send();
    }

    public async Delete(req: Request, res: Response): Promise<Response> {
        return res.status(404).send();
    }
}