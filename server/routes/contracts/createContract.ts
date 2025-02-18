import { Request, Response } from "express";
import { File as MulterFile } from "multer";
import { readFile } from "../../modules/fs/readFile";
import { CONTRACTS_FILE_PATH } from "../../services/filePaths";
import { writeFile } from "../../modules/fs/writeFile";

export const createContract = (req: Request, res: Response): void => {
  const files = ((req as any).files as MulterFile[]) || [];
  const contractsData = req.body;

  // Прочитать существующие договора
  const contracts = readFile(CONTRACTS_FILE_PATH);

  const checkOrgTin = contracts.find((e) => e.orgId === contractsData.orgId);

  if (checkOrgTin) {
    res
      .status(409)
      .json({ error: "Для данной организации существует договор!" });
    return;
  }

  // Создаём новый договор
  const newContract = {
    files: files.map((file) => file.path), // Сохраняем массив путей загруженных файлов
    ...contractsData,
  };

  contracts.push(newContract); // Добавляем новую организацию

  // Записываем обновлённый список договоров в файл
  writeFile(CONTRACTS_FILE_PATH, contracts);

  // Ответ клиенту
  res.status(201).json({
    message: "Договор успешно создана",
    contract: newContract,
  });
};
