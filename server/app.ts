import express from 'express';
import bodyParser, { json } from 'body-parser';
import cors from 'cors';
import dotenv, { DotenvConfigOutput } from 'dotenv';
import { createConnection } from 'typeorm';
import { Film } from "./entities/New-Film.entity";
import GetExcelFile from './routes/GetExcelFile';
import GetFavoriteFilmById from "./routes/GetFavoriteFilmById";
import GetFavoriteFilmFromDB from "./routes/GetFavoriteFilmFromDB";
import GetFilmsFromAPI from "./routes/GetFilmsFromAPI";
import GetFilmsFromDB from './routes/GetFilmsFromDB';

class App {

    public app!: express.Application;
    public dotenv: DotenvConfigOutput;

    constructor() {
        this.app = express();
        this.dotenv = dotenv.config();
        this.setConfig();
        this.startApp();
        this.connectToDB();
        this.setControllers();
    }

    private setConfig(): void {
        this.app.use(json());
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(cors());
    }

    private async connectToDB(): Promise<void> {
        try {
            await createConnection({
                type: 'postgres',
                host: process.env.DB_HOST as string,
                port: +(process.env.DB_PORT as string),
                username: process.env.DB_USERNAME as string,
                password: process.env.DB_PASSWORD as string,
                database: process.env.DB_NAME as string,
                entities: [
                    Film,
                ],
                synchronize: true
            });
            console.log('Connected to Postgres');
        } catch(e) {
            console.log(e);
            throw new Error('Something went wrong' + e);
        }
    }

    private async startApp(): Promise<void> {
        this.app.listen(process.env.APP_PORT, () => {
            console.log(`App listening on ${process.env.APP_PORT}`);
        });
    }

    private setControllers(): void {
        this.app.use(GetExcelFile);
        this.app.use(GetFavoriteFilmById);
        this.app.use(GetFavoriteFilmFromDB);
        this.app.use(GetFilmsFromAPI);
        this.app.use(GetFilmsFromDB);
    }
}

export default new App().app;
