import { ApolloError } from "apollo-server";
import { extendType, inputObjectType, objectType } from "nexus";
import { randomStr } from "../services/encryptions";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Context } from "../Context";

export const user = objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("userName");
    t.string("email");
    t.string("name");
    t.string("password");
  },
});

//

export const userLoginInput = inputObjectType({
  name: "loginInput",
  definition(t) {
    t.nonNull.string("email");
    t.nonNull.string("password");
  },
});

export const loginPayload = objectType({
  name: "LoginPayload",
  definition(t) {
    t.string("accessToken");
  },
});

export const userFiltered = inputObjectType({
  name: "InputNameUser",
  definition(t) {
    t.string("userName");
  },
});

export const login = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("login", {
      type: "LoginPayload",
      args: { userLoginInput },
      async resolve(_root, args, ctx: Context) {
        if (args.userLoginInput) {
          try {
            const email = args.userLoginInput?.email;
            const password = args.userLoginInput?.password;
            const user: User = await ctx.db.user
              .findMany({ where: { email } })
              .then((users: string | any[]) =>
                users && users.length ? users[0] : null
              );

            if (!user) {
              return new ApolloError(
                `Il n'y a pas d'utilisateur créé pour ${email}`
              );
            }

            const isPasswordValid: boolean = await bcrypt.compare(
              password.trim(),
              user.password
            );
            if (!isPasswordValid) {
              return new ApolloError("Mot de passe invalide");
            }
            const accessToken = randomStr();
            await ctx.redis.setex(
              accessToken,
              process.env.REDIS_EXPIRE ? +process.env.REDIS_EXPIRE : 48 * 3600,
              user && user.id ? user.id : ""
            );

            return { accessToken } as any;
          } catch (error) {
            throw new Error(error);
          }
        }
      },
    });
  },
});
