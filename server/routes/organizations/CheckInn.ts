import { Request, Response, RequestHandler } from "express";
import { readFile } from "../../modules/fs/readFile";
import { ORGANIZATIONS_FILE_PATH } from "../../services/filePaths";

export const CheckInn: RequestHandler = (req: Request, res: Response) => {
	const { inn } = req.body;
	const getInn = readFile(ORGANIZATIONS_FILE_PATH).find(
		(item) => item.tax === inn,
	);
	if (getInn) {
		return res.status(200).send("Инн организации валиден");
	} else {
		return res.status(400).send(`Инн организации не валиден`);
	}
};
