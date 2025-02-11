import path from "path";

export const joinFilePath = (filePath: string) => {
  const pathFile = path.join(process.cwd(), "services", "data", filePath);

  return path.join(process.cwd(), "services", "data", filePath);
};
