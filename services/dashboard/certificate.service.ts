"use server";

import { getUserToken } from "@/helpers/auth";
import { dashboardAxiosInstance } from "@/helpers/axios";

export const getCertificatesService = async () => {
  try {
    const { data } = await dashboardAxiosInstance.get("/certificate/getAll", {
      headers: {
        Authorization: `Bearer ${await getUserToken()}`,
      },
    });
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const addCertificateService = async (formData: FormData) => {
  try {
    const { data } = await dashboardAxiosInstance.post(
      "/certificate/add",
      formData,
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

export const editCertificateService = async (
  id: string,
  formData: FormData,
) => {
  try {
    const { data } = await dashboardAxiosInstance.patch(
      `/certificate/edit/${id}`,
      formData,
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

export const deleteCertificateService = async (id: string) => {
  try {
    const { data } = await dashboardAxiosInstance.delete(
      `/certificate/delete/${id}`,
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
