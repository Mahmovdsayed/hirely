import { axiosInstance } from "@/helpers/axios";
import { SignInType, SignUpType } from "@/types/inputs/auth/auth.types";

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
