import { extendType, inputObjectType, objectType } from "nexus";
import moment from "moment";

import { Context } from "../Context";
import { resolve } from "path/posix";
import { ApolloError } from "apollo-server";
import { Prisma } from "@prisma/client";
moment.locale("fr");

export const vehiculeSearchFilter = inputObjectType({
  name: "vehiculeSearchFilter",
  definition(t) {
    t.nullable.string("Miles_per_Gallone");
    t.nullable.string("Name");
    t.nullable.float("Displacement");
    t.nullable.float("Weight_in_lbs");
    t.nullable.float("Cylinders");
    t.nullable.float("Acceleration");
    t.nullable.string("Year");
    t.nullable.string("Origin");
    t.nullable.int("skip");
    t.nullable.int("take");
  },
});

export const Comment = objectType({
  name: "UserComments",
  definition(t) {
    t.nonNull.string("id");
    t.string("userId");
    t.string("vehiculeId");
    t.string("content");
    t.field("user", {
      type: "User",
      async resolve(parent, arg, ctx: Context) {
        const id = parent.userId;
        return await ctx.db.user.findUnique({ where: { id: id || undefined } });
      },
    });
  },
});

export const Vehicule = objectType({
  name: "Vehicule",
  definition(t) {
    t.string("id");
    t.string("Miles_per_Gallone");
    t.string("Name");
    t.float("Displacement");
    t.float("Weight_in_lbs");
    t.float("Cylinders");
    t.float("Acceleration");
    t.string("Year");
    t.string("Origin");
    t.int("skip");
    t.int("take");
    t.field("comments", {
      type: "UserComments",
      async resolve(parent, arg, ctx: Context) {
        if (ctx.userId && ctx.userId !== "-1") {
          const id = parent.id;
          return (await ctx.db.userComments.findMany({
            where: { id: id || undefined },
          })) as any;
        }
      },
    });
  },
});

export const vehiculeResult = objectType({
  name: "VehiculeResult",
  description: "For pagination",
  definition(t) {
    t.int("total");
    t.list.field("data", { type: "Vehicule" });
  },
});

export const getVehicules = extendType({
  type: "Query",
  definition(t) {
    t.field("getVehicules", {
      type: "VehiculeResult",
      args: { vehiculeSearchFilter },
      async resolve(_root, _args, ctx: Context) {
        const skip =
          (_args &&
            _args.vehiculeSearchFilter &&
            _args.vehiculeSearchFilter.skip) ||
          null ||
          undefined;
        const take =
          (_args &&
            _args.vehiculeSearchFilter &&
            _args.vehiculeSearchFilter.take) ||
          null ||
          undefined;
        const acceleration =
          _args &&
          _args.vehiculeSearchFilter &&
          _args.vehiculeSearchFilter.Acceleration;
        const cylenders =
          _args &&
          _args.vehiculeSearchFilter &&
          _args.vehiculeSearchFilter.Cylinders;
        const Miles_per_Gallone =
          _args &&
          _args.vehiculeSearchFilter &&
          _args.vehiculeSearchFilter.Miles_per_Gallone;
        const name =
          _args &&
          _args.vehiculeSearchFilter &&
          _args.vehiculeSearchFilter.Name;
        const origin =
          _args &&
          _args.vehiculeSearchFilter &&
          _args.vehiculeSearchFilter.Origin;

        const displacement =
          _args &&
          _args.vehiculeSearchFilter &&
          _args.vehiculeSearchFilter.Displacement;
        const Year =
          _args &&
          _args.vehiculeSearchFilter &&
          _args.vehiculeSearchFilter.Year;

        const whereQuery: any = {
          AND: {
            cylenders,
            displacement,
            origin,
            name,
            Miles_per_Gallone,
            acceleration,
            Year,
          },
        };
        const vehiculeData = ctx.db.vehicule.findMany({
          skip,
          take,
          where: { ...whereQuery },
          orderBy: {
            createdAt: "desc",
          },
        });
        const total: number = await ctx.db.vehicule.count({
          where: whereQuery,
        });
        const result = { total, data: vehiculeData };
        return result as any;
      },
    });
  },
});

export const addCommentIput = inputObjectType({
  name: "AddCommentInput",
  definition(t) {
    t.nonNull.string("content");
    t.nonNull.string("vehiculeId");
  },
});
export const addComment = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("addComment", {
      type: "UserComments",
      args: { addCommentIput },
      async resolve(_root, _args, ctx: Context) {
        try {
          if (!ctx.userId || ctx.userId === "-1") {
            return new ApolloError("UseId is required");
          }
          const content = _args.addCommentIput?.content;
          const data: Prisma.UserCommentsCreateInput = {
            content: content || "",
            user: { connect: { id: ctx.userId } },
            vehicule: { connect: { id: _args.addCommentIput?.vehiculeId } },
          };

          const newComment = await ctx.db.userComments.create({ data });
          return newComment as any;
        } catch (error) {
          throw new Error(error);
        }
      },
    });
  },
});
