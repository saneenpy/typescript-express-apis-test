import express, {Request, Response, Router} from 'express';
import {RouteName} from "../enums/route-names.enum";
import {Film} from "../entities/New-Film.entity";
import {PaginatedFilms} from "../interfaces/films.interface";

class GetFavoriteFilmById {

    public app!: express.Application;
    public router!: Router;

    constructor() {
        this.app = express();
        this.createRoute();
    }

    private async createRoute(): Promise<void> {
        this.router = express.Router().get(RouteName.FAVORITES_BY_ID,
            async (req: Request, res: Response) => {
                const { id } = req.params;
                // @ts-ignore
                const expectedMovie: Film | null = await Film.findOne({ where: { id }});
                res.status(200).send(expectedMovie);
            }
        );
    }
}

export default new GetFavoriteFilmById().router;
