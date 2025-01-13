export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

/**
 * Generates a success response object.
 *
 * @param message - A descriptive success message.
 * @param data - Optional data to include in the response.
 * @returns ApiResponse - The formatted success response.
 */
export const successResponse = (message: string, data?: any): ApiResponse => {
  return {
    success: true,
    message,
    data,
  };
};

/**
 * Generates an error response object.
 *
 * @param message - A descriptive error message.
 * @param error - Optional error details.
 * @returns ApiResponse - The formatted error response.
 */
export const errorResponse = (message: string, error?: any): ApiResponse => {
  return {
    success: false,
    message,
    error,
  };
};
