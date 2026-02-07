import { AvatarType } from "../avatarType.type";

interface ProfileType {
  _id: string;
  plan: "free" | "basic" | "pro";
  visibility: "public" | "private";
  userId: string;
  createdAt: string;
  updatedAt: string;
  city: string;
  positionName: string;
  gender: "male" | "female";
  about: string;
  birthday: string;
  country: string;
  nationality: string;
  phone: string;
  firstName: string;
  lastName: string;
  avatar: AvatarType;
}

export type { ProfileType };
