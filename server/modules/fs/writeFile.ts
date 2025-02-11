import fs from "fs";

export const writeFile = (filePath: string, data: any[]): void => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    console.log(`Данные успешно записаны в файл: ${filePath}`);
  } catch (error) {
    console.error(`Ошибка при записи файла ${filePath}:`, error);
  }
};
