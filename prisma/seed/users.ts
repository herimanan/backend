import { PrismaClient, Prisma } from "@prisma/client";
import { hash } from "bcryptjs";
import ObjectID from "bson-objectid";

export const Users = async (prisma: PrismaClient) => {
  const userAccount = await prisma.user.findUnique({
    where: { email: "userOne@email.com" },
  });

  if (!userAccount) {
    const user: Prisma.UserCreateInput[] = [
      {
        id: new ObjectID().toHexString(),
        email: "userOne@email.com",
        lastName: "user",
        firstName: "One",
        password: await hash("userOnePassword", 10),
      },
      {
        id: new ObjectID().toHexString(),
        email: "userTwo@email.com",
        lastName: "user",
        firstName: "One",
        password: await hash("userTwoPassword", 10),
      },
      {
        id: new ObjectID().toHexString(),
        email: "userThree@email.com",
        lastName: "user",
        firstName: "One",
        password: await hash("userThreePassword", 10),
      },
    ];

    console.log("------seed user ----------");
    for (const data of user) {
      await prisma.user.create({ data });
    }
  }
  return;
};
