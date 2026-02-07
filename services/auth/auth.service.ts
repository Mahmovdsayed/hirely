"use server";

import { axiosInstance } from "@/helpers/axios";
import {
  ForgotPasswordType,
  ResendOtpCodeType,
  ResetPasswordType,
  SignInType,
  SignUpType,
  VerifyEmailOTPType,
} from "@/types/inputs/auth/auth.types";

import { cookies } from "next/headers";

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

export const forgotPasswordService = async (payload: ForgotPasswordType) => {
  try {
    const { data } = await axiosInstance.post("/auth/forgot-password", payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const resetPasswordService = async (payload: ResetPasswordType) => {
  try {
    const { data } = await axiosInstance.post("/auth/reset-password", payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const logoutService = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!token || !refreshToken) return;
  try {
    const { data } = await axiosInstance.post("/auth/sign-out", null, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        refreshToken: refreshToken,
      },
    });
    if (data.success) {
      cookieStore.delete("token");
      cookieStore.delete("refreshToken");
    }
    return data;
  } catch (error: any) {
    console.log(error.response);
    throw error;
  }
};
