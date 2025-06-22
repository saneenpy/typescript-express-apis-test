import express, {Request, Response, Router} from 'express';
import {RouteName} from "../enums/route-names.enum";
import {Film} from "../entities/New-Film.entity";
import GenerateXlsx from '../services/generate-xlsx';
import path from "path";
import {GeneratedExcelResponse} from "../interfaces/excel.interface";

class GetExcelFile {

    public app!: express.Application;
    public router!: Router;

    constructor() {
        this.app = express();
        this.createRoute();
    }

    private async createRoute(): Promise<void> {
        this.router = express.Router().get(RouteName.FAVORITES_EXCEL_BY_ID,
            async (req: Request, res: Response) => {
                const { id } = req.params;
                // @ts-ignore
                const expectedMovie: Film | null = await Film.findOne({ where: { id }});
                if (!expectedMovie) {
                    throw new Error('Nie znaleziono filmu o tym ID');
                }

                const result: GeneratedExcelResponse = await GenerateXlsx.generate(expectedMovie);
                if (result?.status !== 200) {
                    throw new Error('Nie udalo sie wygenerowac pliku .xlsx');
                }
                res.status(200).sendFile(path.join(__dirname, '../../../', result?.fileName as string));
            }
        );
    }
}

export default new GetExcelFile().router;
