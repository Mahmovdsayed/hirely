export interface CertificateType {
  _id: string;
  userId: string;
  name: string;
  description: string;
  issueDate: string;
  issuer: string;
  certificateType:
    | "course"
    | "certification"
    | "license"
    | "achievement"
    | "other";
  courseDetails?: {
    courseName?: string;
    courseProvider?: string;
    instructor?: string;
    duration?: number;
    completionDate?: string;
    courseUrl?: string;
    courseLevel?: "beginner" | "intermediate" | "advanced" | "expert";
  };
  skills: string[];
  credentialId?: string;
  credentialUrl?: string;
  completionStatus: "completed" | "in-progress" | "expired";
  createdAt: string;
  updatedAt: string;
}
