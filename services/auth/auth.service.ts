import { axiosInstance } from "@/helpers/axios";
import {
  ResendOtpCodeType,
  SignInType,
  SignUpType,
  VerifyEmailOTPType,
} from "@/types/inputs/auth/auth.types";

export const signInService = async (payload: SignInType) => {
  try {
    const { data } = await axiosInstance.post("/auth/signin", payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const signUpService = async (payload: SignUpType) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const verifyEmailOTPService = async (payload: VerifyEmailOTPType) => {
  try {
    const { data } = await axiosInstance.post("/auth/verify-email", payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const resendOtpCodeService = async (payload: ResendOtpCodeType) => {
  try {
    const { data } = await axiosInstance.post("/auth/resend-otp", payload);
    return data;
  } catch (error) {
    throw error;
  }
};
