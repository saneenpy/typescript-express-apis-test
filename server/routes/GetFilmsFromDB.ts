import express, {Request, Response, Router} from 'express';
import {RouteName} from "../enums/route-names.enum";
import {Film} from "../entities/New-Film.entity";
import {PaginatedFilms} from "../interfaces/films.interface";

class GetFilmsFromDB {

    public app!: express.Application;
    public router!: Router;

    constructor() {
        this.app = express();
        this.createRoute();
    }

    private async createRoute(): Promise<void> {
        this.router = express.Router().get(RouteName.FAVORITES,
            async (req: Request, res: Response) => {
                const page: number = req.query.page ? +req.query.page : 0;
                const size: number = req.query.size ? +req.query.size : 5;
                const expectedMovies: [Film[], number] = await Film.findAndCount({
                    skip: page === 0 ? 0 : page * size,
                    take: size,
                    order: {
                        title: 'ASC',
                    },
                });
                res.status(200).send({
                    size,
                    page,
                    total: expectedMovies[1],
                    content: expectedMovies[0]
                } as PaginatedFilms<Film>);
            }
        );
    }
}

export default new GetFilmsFromDB().router;
