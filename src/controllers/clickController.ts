import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/responseHelper";
import { logClick } from "../services/redisService";

export const renderPage = async (req: Request, res: Response) => {
  res.render("index");
};

/**
 * Controller to handle button click events.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const handleButtonClick = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { button } = req.params;
  const userIp: any = req.ip;

  try {
    await logClick(button, userIp);
    res
      .status(200)
      .json(successResponse(`${button} button clicked successfully!`));
  } catch (error: any) {
    if (error instanceof TypeError) {
      res
        .status(400)
        .json(errorResponse("Invalid input or parameters", error.message));
    } else if (error instanceof RangeError) {
      res
        .status(413)
        .json(errorResponse("Input exceeds acceptable range", error.message));
    } else if (error.code === "ECONNREFUSED") {
      res
        .status(503)
        .json(errorResponse("Service unavailable. Please try again later."));
    } else {
      res
        .status(500)
        .json(errorResponse("Internal Server Error", error.message));
    }
  }
};
