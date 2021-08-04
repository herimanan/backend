import { extendType, inputObjectType, objectType } from "nexus";
import moment from "moment";

import { Context } from "../Context";
moment.locale("fr");

export const vehiculeSearchFilter = inputObjectType({
  name: "vehiculeSearchFilter",
  definition(t) {
    t.nullable.string("type");
    t.nullable.string("name");
    t.nullable.string("range");
    t.nullable.string("year");
    t.nullable.int("skip");
    t.nullable.int("take");
  },
});

export const Comment = objectType({
  name: "UserComments",
  definition(t) {
    t.string("id");
    t.string("userId");
    t.string("vehiculeId");
    t.string("content");
    t.field("user", {
      type: "User",
      async resolve(parent, arg, ctx: Context) {
        const id = parent.userId;
        return await ctx.db.user.findUnique({ where: { id } });
      },
    });
  },
});

export const Vehicule = objectType({
  name: "Vehicule",
  definition(t) {
    t.string("id");
    t.string("type");
    t.string("range");
    t.string("name");
    t.field("comments", {
      type: "UserComments",
      async resolve(parent, arg, ctx: Context) {
        if (ctx.userId && ctx.userId !== "-1") {
          const id = parent.id;
          return await ctx.db.userComments.findMany({ where: {} });
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
    t.list.field("getVehicules", {
      type: "VehiculeResult",
      args: { vehiculeSearchFilter },
      async resolve(_root, _args, ctx: Context) {
        const skip =
          _args &&
          _args.vehiculeSearchFilter &&
          _args.vehiculeSearchFilter.skip;
        const take =
          _args &&
          _args.vehiculeSearchFilter &&
          _args.vehiculeSearchFilter.take;
        const type =
          _args &&
          _args.vehiculeSearchFilter &&
          _args.vehiculeSearchFilter.type;
        const range =
          _args &&
          _args.vehiculeSearchFilter &&
          _args.vehiculeSearchFilter.range;
        const year =
          _args &&
          _args.vehiculeSearchFilter &&
          _args.vehiculeSearchFilter.year;
        const name =
          _args &&
          _args.vehiculeSearchFilter &&
          _args.vehiculeSearchFilter.name;

        const whereQuery = {
          AND: {
            type,
            year,
            range,
            name,
          },
        };
        const transactionData = ctx.db.vehicule.findMany({
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

        const result = { total, data: transactionData };

        return result;
      },
    });
  },
});
