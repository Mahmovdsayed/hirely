import { AvatarType } from "../avatarType.type";

interface EducationType {
  _id: string;
  userId: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  grade?: string;
  gpa?: number;
  description?: string;
  institutionImage?: AvatarType;
  isCurrent: boolean;
  location?: string;
  activities?: string[];
  achievements?: string[];
  coursework?: string[];
  aiCounter: number;
  createdAt: string;
  updatedAt: string;
}

export type { EducationType };
