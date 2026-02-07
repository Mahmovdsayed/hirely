"use server";

import { getUserToken } from "@/helpers/auth";
import { dashboardAxiosInstance } from "@/helpers/axios";
import { ProfileType } from "@/types/dashboard/profile.types";
import { cookies } from "next/headers";

export const getUserProfile = async () => {
  try {
    const { data } = await dashboardAxiosInstance.get("/profile/me", {
      headers: {
        Authorization: `Bearer ${await getUserToken()}`,
      },
    });
    return data.data;
  } catch (error: any) {
    throw error;
  }
};

export const updateProfile = async (payload: ProfileType) => {
  try {
    const { data } = await dashboardAxiosInstance.patch("/profile/edit", payload, {
      headers: {
        Authorization: `Bearer ${await getUserToken()}`,
      },
    });
    return data.data;
  } catch (error: any) {
    throw error;
  }
};
