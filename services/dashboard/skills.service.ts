"use server";

import { getUserToken } from "@/helpers/auth";
import { dashboardAxiosInstance } from "@/helpers/axios";
import { addSkillTypes } from "@/types/dashboard/skills.types";

export const getUserSkills = async () => {
  try {
    const { data } = await dashboardAxiosInstance.get("/skills", {
      headers: {
        Authorization: `Bearer ${await getUserToken()}`,
      },
    });
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const addSkillService = async (skill: addSkillTypes) => {
  try {
    const { data } = await dashboardAxiosInstance.post("/skills/add", skill, {
      headers: {
        Authorization: `Bearer ${await getUserToken()}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const editSkillService = async (
  skillId: string,
  updatedSkill: addSkillTypes,
) => {
  try {
    const { data } = await dashboardAxiosInstance.patch(
      `/skills/edit/${skillId}`,
      updatedSkill,
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

export const deleteSkillService = async (skillId: string) => {
  try {
    const { data } = await dashboardAxiosInstance.delete(
      `/skills/delete/${skillId}`,
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
