import { Router } from "express";

import getUsers from "./getUsers";
import createUser from "./createUser";
import updateUser from "./updateUser";
import deleteUser from "./deleteUser";
import { Logme } from "./Logme";

const router = Router();

console.log("Маршруты подключаются");

router.post("/", createUser);
router.post("/logme", Logme);
router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
