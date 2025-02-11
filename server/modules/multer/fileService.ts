// fileService.ts

import multer from "multer";
import path from "path";
import fs from "fs"; // Для работы с файловой системой

const fileService = multer.diskStorage({
  destination: (req, file, cb) => {
    // Получаем сгенерированный ID организации из req.body
    const orgId = req.body.id;

    // Путь до папки организации
    const orgFolderPath = `uploads/organizations/${orgId}`;

    // Создаём папку, если её нет
    if (!fs.existsSync(orgFolderPath)) {
      fs.mkdirSync(orgFolderPath, { recursive: true }); // Создаём папку с идентификатором организации
    }

    cb(null, orgFolderPath); // Устанавливаем папку для загрузки
  },
  filename: (req, file, cb) => {
    // Генерация уникального имени для каждого файла
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage: fileService });
