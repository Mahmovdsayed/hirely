"use server";

import { getUserToken } from "@/helpers/auth";
import { dashboardAxiosInstance } from "@/helpers/axios";

export const getUserEducations = async () => {
  try {
    const { data } = await dashboardAxiosInstance.get("/education/getAll", {
      headers: {
        Authorization: `Bearer ${await getUserToken()}`,
      },
    });
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const addEducationService = async (education: FormData) => {
  try {
    const { data } = await dashboardAxiosInstance.post(
      "/education/add",
      education,
      {
        headers: {
          Authorization: `Bearer ${await getUserToken()}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const editEducationService = async (
  educationId: string,
  education: FormData,
) => {
  try {
    const { data } = await dashboardAxiosInstance.patch(
      `/education/edit/${educationId}`,
      education,
      {
        headers: {
          Authorization: `Bearer ${await getUserToken()}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteEducationService = async (educationId: string) => {
  try {
    const { data } = await dashboardAxiosInstance.delete(
      `/education/delete/${educationId}`,
      {
        headers: {
          Authorization: `Bearer ${await getUserToken()}`,
        },
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
};
