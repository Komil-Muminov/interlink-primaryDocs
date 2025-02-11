import { Request, Response } from "express";

const getUsers = (req: Request, res: Response) => {
  res.json({ message: "Список пользователей" });
};

export default getUsers;
