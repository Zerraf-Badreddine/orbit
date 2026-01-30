export function createVerificationEmailTemplate(
  url: string,
  token: string,
): string {
  return `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Verify Your Email</h2>
        <p>Click the link below to verify your email:</p>
        <a href="${url}" style="background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Email
        </a>
        <p style="margin-top: 20px; color: #666;">If you didn't request this, please ignore this email.</p>
        <p style="font-size: 12px; color: #999;">Token: ${token}</p>
    </body>
    </html>
  `;
}
