import ExcelJS from 'exceljs';
import path from 'path';

export class ExcelUtil {
    
  async readExcel(worksheet: any, searchText: string) {
  let output = { row: -1, column: -1 };

  worksheet.eachRow((row: any, rowNumber: number) => {
    row.eachCell((cell: any, colNumber: number) => {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.column = colNumber;
      }
    });
  });

  return output;
}


async  writeExcelTest(
  searchText: string,
  replaceText: string,
  change: { colChange: number },
  filePath: string
) {
  const absolutePath = path.resolve(filePath);
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(absolutePath);

  const worksheet = workbook.getWorksheet('Sheet1');

 
  if (!worksheet) {
    console.log('Sheet1 not found in Excel!');
    return;
  }


  const output = await this.readExcel(worksheet, searchText);

 
  if (output.row !== -1 && output.column !== -1) {
    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(absolutePath);
  } else {
    console.log(`Text "${searchText}" not found in Excel.`);
  }
}}