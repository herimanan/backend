import { PrismaClient } from "@prisma/client";
import { vehiculeObj } from "./vehiculeData";

export const Veicule = async (prisma: PrismaClient) => {
  console.log("------seed vehicule ----------");
  for (const data of vehiculeObj) {
    await prisma.vehicule.create({ data });
  }

  return;
};
