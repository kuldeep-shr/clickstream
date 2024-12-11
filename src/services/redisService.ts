import { createClient } from "redis";

const redisClient = createClient();
redisClient.connect();

export const checkRateLimit = async (
  button: string,
  userIp: string
): Promise<boolean> => {
  const key = `${button}:${userIp}`;
  const currentCount = await redisClient.incr(key);

  if (currentCount === 1) {
    await redisClient.expire(key, 60); // Set key to expire after 60 seconds
  }

  return currentCount > 10; // Returns true if limit exceeded
};

export const logClick = async (button: string, userIp: string) => {
  const logKey = `log:${button}:${userIp}`;
  const timestamp = new Date().toISOString();
  await redisClient.lPush(logKey, timestamp); // Corrected method name
};
