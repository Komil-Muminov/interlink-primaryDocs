import { Request, Response, RequestHandler } from "express";
import { readFile } from "../../modules/fs/readFile";
import { ORGANIZATIONS_FILE_PATH } from "../../services/filePaths";

export const CheckInn: RequestHandler = async (req: Request, res: Response) => {
	try {
		const { inn } = req.body;

		const organizations = readFile(ORGANIZATIONS_FILE_PATH);

		const getInn = organizations.find((item) => item.tax === inn);

		if (getInn) {
			return res.status(200).json({ tax: getInn.tax });
		} else {
			return res.status(400).json({ message: "Инн организации не валиден" });
		}
	} catch (error) {
		console.error("Ошибка при проверке ИНН:", error);
		return res.status(500).json({ message: "Ошибка сервера" });
	}
};
