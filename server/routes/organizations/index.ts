import Router from "express";

import { createOrganization } from "./createOrganization";
import { deleteOrganization } from "./deleteOrganization";
import { upload } from "../../modules/multer/fileService";
import { getOrganizationById } from "./getOrganizationById";
import { getOrganizations } from "./getOrganizations";

const router = Router();

router.post("/", upload.array("files"), createOrganization);
router.get("/", getOrganizations);
router.get("/:id", getOrganizationById);
router.delete("/:id", deleteOrganization);

export default router;
