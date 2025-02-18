import { Request, Response } from "express";
import { readFile } from "../../modules/fs/readFile";
import { CONTRACTS_FILE_PATH } from "../../services/filePaths";

export const getContractById = (req: Request, res: Response): void => {
  try {
    const showId = req.params.id; // Получаем id из URL-параметров

    if (!showId) {
      res.status(400).json({ error: "Некорректный ID" });
    }

    const contract = readFile(CONTRACTS_FILE_PATH);
    const show = contract.find((cnt) => cnt.id === showId);

    if (!show) {
      res.status(404).json({ error: "Договора не найден" });
    }
    res.status(200).json(show); // Возвращаем только найденный список
  } catch (error) {
    console.error("Ошибка при чтении файла contracts.json: ", error);
    res.status(500).json({ error: "Ошибка сервера при чтении данных" });
  }
};
