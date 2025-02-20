import { Request, Response } from "express";
import { readFile } from "../../modules/fs/readFile";
import { CONTRACTS_FILE_PATH } from "../../services/filePaths";
import { writeFile } from "../../modules/fs/writeFile";
import fs from "fs"; // Для работы с файловой системой
import { joinFilePath } from "../../modules/path/joinFilePath";

export const updateContractById = (req: Request, res: Response): void => {
  const { contractId, htmlContent } = req.body;
  console.log(htmlContent);

  try {
    const contractData = readFile(CONTRACTS_FILE_PATH);

    const contractIndex = contractData.findIndex(
      (cnt) => cnt.id === contractId
    );

    if (contractIndex === -1) {
      res.status(404).json({ error: "Договор не найден" });
    }

    const contractsFolderPath = joinFilePath(
      ["uploads", "contracts"],
      contractId
    ); // Путь к папке для контракта

    // Создаём папку, если её нет
    if (!fs.existsSync(contractsFolderPath)) {
      fs.mkdirSync(contractsFolderPath, { recursive: true }); // Создаём папку с идентификатором организации
    }

    const htmlFilePath = joinFilePath(
      ["uploads", "contracts", contractId],
      `htmlContent-${contractId}.html`
    );

    writeFile(htmlFilePath, htmlContent);

    // Обновляем данные контракта
    contractData[contractIndex].htmlContent = htmlFilePath;
    contractData[contractIndex].state = (
      parseInt(contractData[contractIndex].state) + 1
    ).toString();

    writeFile(CONTRACTS_FILE_PATH, contractData);

    res.status(200).json({
      message: "Договор успешно изменен",
      contractData: contractData,
    });
  } catch (error) {
    console.error("Ошибка при чтении файла contracts.json: ", error);
    res.status(500).json({ error: "Ошибка сервера при чтении данных" });
  }
};
