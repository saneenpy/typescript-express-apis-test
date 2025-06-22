import {Film} from "../entities/New-Film.entity";
import xlsx from 'xlsx';
import {GeneratedExcelResponse} from "../interfaces/excel.interface";

export default class GenerateXlsx {
    public static async generate(data: Film): Promise<GeneratedExcelResponse> {
        const excelData = {...data, characters: data?.characters.join(',')};
        const worksheet = xlsx.utils.json_to_sheet([excelData]);
        const workbook = xlsx.utils.book_new();
        const fileName = data?.title.replace(/\s/g, "");

        xlsx.utils.book_append_sheet(workbook, worksheet, fileName);
        xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        xlsx.write(workbook, { bookType: 'xlsx', type: 'binary' });

        try {
            await xlsx.writeFile(workbook, `${fileName}.xlsx`);
            return {
                status: 200,
                message: `Zapisano plik jako ${fileName}.xlsx`,
                fileName: `${fileName}.xlsx`
            };
        } catch(e) {
            return {
                status: 400,
                message: e
            };
        }
    }
}
