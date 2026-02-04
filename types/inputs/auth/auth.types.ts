interface SignInType {
  email: string;
  password: string;
}

interface SignUpType {
  email: string;
  password: string;
  role: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
}
interface VerifyEmailOTPType {
  email: string;
  otp: string;
}

interface ResendOtpCodeType {
  email: string;
}

interface ForgotPasswordType {
  email: string;
}

interface ResetPasswordType {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export type {
  SignInType,
  SignUpType,
  VerifyEmailOTPType,
  ResendOtpCodeType,
  ForgotPasswordType,
  ResetPasswordType,
};
