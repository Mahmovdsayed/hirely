"use server";

import { getUserToken } from "@/helpers/auth";
import { dashboardAxiosInstance } from "@/helpers/axios";
import { FAQTypes } from "@/types/dashboard/faq.types";

export const getUserFAQ = async () => {
  try {
    const { data } = await dashboardAxiosInstance.get("/faq", {
      headers: {
        Authorization: `Bearer ${await getUserToken()}`,
      },
    });
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const addFAQService = async (faq: FAQTypes) => {
  try {
    const { data } = await dashboardAxiosInstance.post("/faq/add", faq, {
      headers: {
        Authorization: `Bearer ${await getUserToken()}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteFAQService = async (faqId: string) => {
  try {
    const { data } = await dashboardAxiosInstance.delete(
      `/faq/delete/${faqId}`,
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

export const editFAQService = async (faqId: string, faq: FAQTypes) => {
  try {
    const { data } = await dashboardAxiosInstance.patch(
      `/faq/edit/${faqId}`,
      faq,
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
