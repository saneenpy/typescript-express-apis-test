import fetch from 'node-fetch';
import {Film} from "../entities/New-Film.entity";
import {Films} from "../interfaces/films.interface";

export const url: string = 'https://swapi.dev/api'

export class FetchFilmsService {
    public static async fetchFilmsFromSwapi(): Promise<Films[]> {
        const fetchData: any = await fetch(`${url}/films`);
        if (fetchData.status > 202) {
            throw new Error('Nie znaleziono żadnych filmów.');
        }
        const films: any = await fetchData.json();

        const dataToSave: Films[] = [];
        films?.results.forEach((film: any) => dataToSave.push(
          {
            title: film?.title,
            releaseDate: film?.release_date,
            characters: film?.characters
          } as Films));
        const results: Films[] = await this.saveNewFilmsInDatabase(dataToSave);
        return results;
    }

    private static async saveNewFilmsInDatabase(data: Films[]): Promise<Films[]> {
        const returned: Films[] = [];
        for (const each of data) {
            const { title, releaseDate, characters } = each;
            const isAlreadyExist: Films | null = await Film.findOne({ where: { title }});

            if (isAlreadyExist) {
                returned.push(isAlreadyExist);
            } else {
                const newFilm = Film.create({
                    title,
                    releaseDate,
                    characters
                });
                await newFilm.save();
                returned.push(newFilm);
            }
        }
        return returned;
    }
}
