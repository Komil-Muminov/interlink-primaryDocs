import { Request, Response } from "express";
import { readFile } from "../../modules/fs/readFile";
import { CONTRACTS_FILE_PATH } from "../../services/filePaths";

export const getContracts = (req: Request, res: Response): void => {
  try {
    const contractsData = readFile(CONTRACTS_FILE_PATH);
    res.status(200).json(contractsData);
  } catch (error) {
    console.error("Ошибка при чтении файла contracts.json", error);
    res.status(500).json({ error: "Ошибка сервера при чтении данных" });
  }
};
