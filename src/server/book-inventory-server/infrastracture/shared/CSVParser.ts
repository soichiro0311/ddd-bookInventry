import * as fs from "fs";
import { parse } from "csv-parse/sync";

export const parseCSV = (filePath: string) => {
  const data = fs.readFileSync(filePath);
  const records: Array<any> = parse(data, {
    bom: true,
    from: 2,
  });

  return records;
};
