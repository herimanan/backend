import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";
import { RedisPubSub } from "graphql-redis-subscriptions";

const redisConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT ? +process.env.REDIS_PORT : 6379,
};
export const redis = new Redis(redisConfig);
const db = new PrismaClient();
interface Params {
  req: any;
  connection: any;
}
const getUserId = async (req: any, connection: any) => {
  if (connection) {
    return connection.context.userId;
  }
  if (typeof req === "string") {
    return redis.get(req);
  }
  if (req && req.headers && req.headers.authorization) {
    const userId = await redis.get(
      req.headers.authorization.replace("Bearer ", "")
    );
    return userId;
  }
  return -1;
};

const getIp = async (req: any, connection: any) => {
  if (connection) {
    return connection.context.ip;
  }
  if (req && req.headers && req.headers.ip) {
    return req.headers.ip;
  }
  return null;
};

const refreshToken = async (req: any, connection: any, userId: string) => {
  if (connection) {
    return;
  }
  if (typeof req === "string") {
    redis.set(req, userId);
    return;
  }
  if (req && req.headers && req.headers.authorization) {
    redis.set(req.headers.authorization.replace("Bearer ", ""), userId);
    return;
  }
};
export interface Context {
  db: PrismaClient;
  redis: Redis.Redis;
  pubsub?: RedisPubSub;
  userId: string;
}

export const context = async ({ req, connection }: Params) => {
  const userId = await getUserId(req, connection);
  refreshToken(req, connection, userId);
  return { db, userId, redis };
};
