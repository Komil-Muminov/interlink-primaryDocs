import { Router } from "express";
import { createContract } from "./createContract";
import { getContracts } from "./getContracts";
import { upload } from "../../modules/multer/fileService";
import { getContractById } from "./getContractById";
import { updateContractById } from "./updateContractById";

const router = Router();

router.post("/", upload.array("files"), createContract);
router.get("/", getContracts);
router.get("/:id", getContractById);
router.put("/:id", updateContractById);

export default router;
