import express, {Request, Response, Router} from 'express';
import {RouteName} from "../enums/route-names.enum";
import { body, validationResult, Result } from 'express-validator';
import { ValidationError } from "express-validator/src/base";
import {Film} from "../entities/New-Film.entity";

class GetFavoriteFilmFromDB {

    public app!: express.Application;
    public router!: Router;

    constructor() {
        this.app = express();
        this.createRoute();
    }

    private async createRoute(): Promise<void> {
        this.router = express.Router().post(RouteName.FAVORITES,
            [
                body('id').exists().withMessage('You need to pass film ID.'),
            ],
            async (req: Request, res: Response) => {
                const errors: Result<ValidationError> = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const { id } = req.body;
                const expectedMovie: Film | null = await Film.findOne({ where: { id }});
                res.status(200).send(expectedMovie);
            }
        );
    }
}

export default new GetFavoriteFilmFromDB().router;
