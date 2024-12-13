import { createClient } from "redis";

// const redisClient = createClient();
// redisClient.connect();

const redisClient = createClient({
  url: "redis://redis:6379",
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

// Ensure Redis client connects properly
(async () => {
  await redisClient.connect();
})();

export const checkRateLimit = async (
  button: string,
  userIp: string
): Promise<boolean> => {
  const key = `${button}:${userIp}`;
  const currentCount = await redisClient.incr(key);

  if (currentCount === 1) {
    await redisClient.expire(key, 60); // Set key to expire after 60 seconds
  }

  return currentCount > 10;
};

export const logClick = async (button: string, userIp: string) => {
  const logKey = `log:${button}:${userIp}:timestamp`;
  const timestamp = new Date().toISOString();
  await redisClient.lPush(logKey, timestamp);
};

export const closeRedisClient = async () => {
  await redisClient.quit();
};
