interface SkillType {
  _id: string;
  name: string;
  category: string;
  updatedAt: string;
  createdAt: string;
}

interface SkillsApiResponse {
  skillCount: number;
  skills: SkillType[];
}

interface addSkillTypes {
  name: string;
  category: string;
}

export type { SkillType, SkillsApiResponse, addSkillTypes };
