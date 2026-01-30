import type { Context } from "hono";

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
  status: number = 200,
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

export function errorResponse(c: Context, error: string, status: number = 400) {
  return c.json<ApiResponse>(
    {
      success: false,
      error,
    },
    status,
  );
}
