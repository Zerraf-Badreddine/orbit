export function createResetPasswordTemplate(
  url: string,
  token: string,
): string {
  return `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Reset Your Password</h2>
        <p>You requested to reset your password. Click the button below to proceed:</p>
        <a href="${url}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
        </a>
        <p style="margin-top: 20px; color: #666;">If you did not request this, please ignore this email.</p>
        <p style="font-size: 12px; color: #999;">Token: ${token}</p>
    </body>
    </html>
  `;
}
