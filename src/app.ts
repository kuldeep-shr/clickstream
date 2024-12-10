import express, { Request, Response } from "express";
import path from "path";
import { createClient } from "redis";

// Constants
const BUTTON_RATE_LIMIT = 10; // Max allowed clicks per minute
const RATE_LIMIT_TTL = 60; // Time-to-live for rate limiting in seconds

// Setup Express app
const app = express();
const port = process.env.PORT || 8080;

// Create and connect to the Redis client
const redisClient = createClient();

// Redis connection error handling
redisClient.on("error", (err) => {
  console.log("Redis Client Error", err);
});

async function connectRedis() {
  await redisClient.connect();
}

connectRedis();

// Middleware to serve static files (UI)
app.use(express.static(path.join(__dirname, "public")));

// Rate Limiting Handler
const rateLimit = async (button: string, userIp: string): Promise<boolean> => {
  const key = `${button}:${userIp}`;

  try {
    const currentCount = await redisClient.incr(key);
    if (currentCount === 1) {
      // Set TTL to 60 seconds (1 minute)
      await redisClient.expire(key, RATE_LIMIT_TTL);
    }
    return currentCount > BUTTON_RATE_LIMIT;
  } catch (error) {
    console.error("Error checking rate limit:", error);
    return false;
  }
};

// Handler for button click
const handleButtonClick = async (button: string, req: Request) => {
  const userIp: any = req.ip;

  console.log("userIp.....", userIp);

  // Check rate limit
  const isRateLimited = await rateLimit(button, userIp);
  if (isRateLimited) {
    return { message: `Rate limit reached for ${button} button.` };
  }

  // Log the click
  console.log(`${button} button clicked by:`, userIp);
  return { message: `${button} button clicked!` };
};

// Route for handling Blue Button Click
app.post("/click/blue", async (req: Request, res: Response): Promise<any> => {
  const getResponse = await handleButtonClick("Blue", req);
  console.log("getResponse...", getResponse);
  return res.json(getResponse);
});

// Route for handling Red Button Click
app.post("/click/red", async (req: Request, res: Response): Promise<any> => {
  return handleButtonClick("Red", req);
});

// Catch-all route for serving the HTML file
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
