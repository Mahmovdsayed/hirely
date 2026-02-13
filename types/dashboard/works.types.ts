import { AvatarType } from "../avatarType.type";

interface workType {
  _id: string;
  achievements: [];
  aiCounter: number;
  companyImage: AvatarType;
  companyName: string;
  createdAt: string;
  description: string;
  employmentType: string;
  endDate: string;
  isCurrent: boolean;
  location: string;
  position: string;
  responsibilities: [];
  skills: [];
  startDate: string;
  updatedAt: string;
  userId: string;
}

export type { workType };
