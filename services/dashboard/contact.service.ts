"use server";

import { getUserToken } from "@/helpers/auth";
import { dashboardAxiosInstance } from "@/helpers/axios";
import {
  ContactsTypes,
  SingleContactType,
} from "@/types/dashboard/contacts.types";

export const getUserContacts = async () => {
  try {
    const { data } = await dashboardAxiosInstance.get("/contact/getAll", {
      headers: {
        Authorization: `Bearer ${await getUserToken()}`,
      },
    });
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteContactService = async (contactId: string) => {
  try {
    const { data } = await dashboardAxiosInstance.delete(
      `/contact/delete/${contactId}`,
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

export const editContactService = async (
  contactId: string,
  contact: SingleContactType,
) => {
  try {
    const { data } = await dashboardAxiosInstance.patch(
      `/contact/edit/${contactId}`,
      contact,
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

export const addContactService = async (contact: ContactsTypes) => {
  try {
    const { data } = await dashboardAxiosInstance.post(
      "/contact/add",
      contact,
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
