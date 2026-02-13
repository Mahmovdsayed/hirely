"use server";

import { getUserToken } from "@/helpers/auth";
import { dashboardAxiosInstance } from "@/helpers/axios";
import { workType } from "@/types/dashboard/works.types";

export const getUserWorks = async () => {
  try {
    const { data } = await dashboardAxiosInstance.get("/work/getAll", {
      headers: {
        Authorization: `Bearer ${await getUserToken()}`,
      },
    });
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteWorkService = async (workId: string) => {
  try {
    const { data } = await dashboardAxiosInstance.delete(
      `/work/delete/${workId}`,
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

export const addWorkService = async (work: workType) => {
  try {
    const { data } = await dashboardAxiosInstance.post("/work/add", work, {
      headers: {
        Authorization: `Bearer ${await getUserToken()}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
export const editWorkService = async (workId: string, work: FormData) => {
  try {
    const { data } = await dashboardAxiosInstance.patch(
      `/work/edit/${workId}`,
      work,
      {
        headers: {
          Authorization: `Bearer ${await getUserToken()}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
};
