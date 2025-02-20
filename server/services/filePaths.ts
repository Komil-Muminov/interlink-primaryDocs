import { joinFilePath } from "../modules/path/joinFilePath";

export const USERS_FILE_PATH = joinFilePath(["services", "data"], "users.json");
export const ORGANIZATIONS_FILE_PATH = joinFilePath(
  ["services", "data"],
  "organizations.json"
);
export const CONTRACTS_FILE_PATH = joinFilePath(
  ["services", "data"],
  "contracts.json"
);
