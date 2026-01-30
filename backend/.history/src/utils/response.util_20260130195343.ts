import type { Context, StatusCode } from "hono/utils/http-status";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export function successResponse<T>(
  c: Context,
  data: T,
  message?: string,
  status: StatusCode = 200,
) {
  return c.json<ApiResponse<T>>(
    {
      success: true,
      data,
      ...(message && { message }),
    },
    status,
  );
}

export function errorResponse(
  c: Context,
  error: string,
  status: StatusCode = 400,
) {
  return c.json<ApiResponse>(
    {
      success: false,
      error,
    },
    status,
  );
}
