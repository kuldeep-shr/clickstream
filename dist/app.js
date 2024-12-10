"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const redis_1 = require("redis");
// Constants
const BUTTON_RATE_LIMIT = 10; // Max allowed clicks per minute
const RATE_LIMIT_TTL = 60; // Time-to-live for rate limiting in seconds
// Setup Express app
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
// Create and connect to the Redis client
const redisClient = (0, redis_1.createClient)();
// Redis connection error handling
redisClient.on("error", (err) => {
    console.log("Redis Client Error", err);
});
async function connectRedis() {
    await redisClient.connect();
}
connectRedis();
// Middleware to serve static files (UI)
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Rate Limiting Handler
const rateLimit = async (button, userIp) => {
    const key = `${button}:${userIp}`;
    try {
        const currentCount = await redisClient.incr(key);
        if (currentCount === 1) {
            // Set TTL to 60 seconds (1 minute)
            await redisClient.expire(key, RATE_LIMIT_TTL);
        }
        return currentCount > BUTTON_RATE_LIMIT;
    }
    catch (error) {
        console.error("Error checking rate limit:", error);
        return false;
    }
};
// Handler for button click
const handleButtonClick = async (button, req) => {
    const userIp = req.ip;
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
app.post("/click/blue", async (req, res) => {
    const getResponse = await handleButtonClick("Blue", req);
    console.log("getResponse...", getResponse);
    return res.json(getResponse);
});
// Route for handling Red Button Click
app.post("/click/red", async (req, res) => {
    return handleButtonClick("Red", req);
});
// Catch-all route for serving the HTML file
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "public", "index.html"));
});
// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map