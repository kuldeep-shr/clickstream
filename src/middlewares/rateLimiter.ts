import { Request, Response, NextFunction } from "express";
import { checkRateLimit } from "../services/redisService";
import { errorResponse } from "../utils/responseHelper";
import { publishMessage } from "../services/pubsubService";

/**
 * Middleware to apply rate limiting based on button clicks and user IP.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 */
export const rateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { button } = req.params;
  const userIp: any = req.ip;

  try {
    const isRateLimited = await checkRateLimit(button, userIp);

    if (isRateLimited) {
      await publishMessage(button, userIp);
      res
        .status(429)
        .json(errorResponse(`Rate limit reached for ${button} button.`));
    } else {
      next();
    }
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("Error in rate limiting middleware", error));
  }
};
