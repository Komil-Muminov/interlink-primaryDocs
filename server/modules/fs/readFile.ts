import fs from "fs";

export const readFile = (filePath: string): any[] => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(`Ошибка при чтении файла ${filePath}`, error);
    return [];
  }
};
