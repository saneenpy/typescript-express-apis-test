import express, {Request, Response, Router} from 'express';
import {RouteName} from "../enums/route-names.enum";
import {FetchFilmsService} from "../services/fetch-films.service";
import {Films} from "../interfaces/films.interface";

class GetFilmsFromAPI {

    public app!: express.Application;
    public router!: Router;

    constructor() {
        this.app = express();
        this.createRoute();
    }

    private async createRoute(): Promise<void> {
        this.router = express.Router().get(RouteName.FILMS,
            async (req: Request, res: Response) => {
                const results: Films[] = await FetchFilmsService.fetchFilmsFromSwapi();
                return res.status(200).send(results);
            }
        );
    }
}

export default new GetFilmsFromAPI().router;
