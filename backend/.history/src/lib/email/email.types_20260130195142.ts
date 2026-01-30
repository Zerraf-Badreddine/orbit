export interface EmailOptions {
  to: string;
  subject?: string;
  html?: string;
}

export interface VerificationEmailOptions {
  to: string;
  token: string;
  url: string;
}

export interface ResetPasswordEmailOptions {
  to: string;
  token: string;
  url: string;
}
