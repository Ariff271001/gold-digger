import path from "node:path";
import fs from "node:fs/promises";

export const addPurchase = async (data) => {
  const purchaseDir = path.join("outputs", "purchases.txt");
  try {
    fs.appendFile(purchaseDir, `${data}\n`);
  } catch (error) {
    throw new Error(error);
  }
};
