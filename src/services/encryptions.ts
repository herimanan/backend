import { randomBytes } from "crypto";
export const randomStr = (length?: number): string => {
  return randomBytes(length || 54)
    .toString("base64")
    .replace(/\//gi, "*");
};
