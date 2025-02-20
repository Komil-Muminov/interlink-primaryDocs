import { Request, Response } from "express";
import { readFile } from "../../modules/fs/readFile";
import { CONTRACTS_FILE_PATH } from "../../services/filePaths";
import path from "path";

export const getContractById = (req: Request, res: Response) => {
  try {
    const showId = req.params.id; // Получаем id из URL-параметров

    if (!showId) {
      return res.status(400).json({ error: "Некорректный ID" });
    }

    const contract = readFile(CONTRACTS_FILE_PATH);
    const show = contract.find((cnt) => cnt.id === showId);

    if (!show) {
      return res.status(404).json({ error: "Договора не найден" });
    }

    if (show.htmlContent && typeof show.htmlContent === "string") {
      const htmlContent = readFile(show.htmlContent, false);
      console.log(htmlContent);

      show.htmlContent = htmlContent;
    }

    return res.status(200).json(show); // Возвращаем только найденный список
  } catch (error) {
    console.error("Ошибка при чтении файла contracts.json: ", error);
    res.status(500).json({ error: "Ошибка сервера при чтении данных" });
  }
};
