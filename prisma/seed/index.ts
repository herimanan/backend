import { Users } from "./users";
import { Veicule } from "./vehicule";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const main = async () => {
  await Users(prisma);
  await Veicule(prisma);
};
main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
