export const clientURL = "http://localhost:3000";
export const serverURL = "http://localhost:8080";

export const MAX_FILE_SIZE_MB = 5; // Maximum file size in megabytes
export const allowedExtensions = {
  image: ["jpg", "jpeg", "png", "webp", "svg", "heic"],
  document: ["pdf", "doc", "docx", "txt", "md"],
};

export const IMAGE_FILTERS = [
  { name: "None", value: "none" },
  { name: "Grayscale", value: "grayscale(100%)" },
  { name: "Sepia", value: "sepia(100%)" },
  { name: "Warm", value: "sepia(30%) saturate(140%) hue-rotate(-10deg)" },
  { name: "Cool", value: "hue-rotate(30deg) saturate(120%)" },
  { name: "Dramatic", value: "contrast(150%) brightness(80%)" },
  { name: "B&W", value: "grayscale(100%) contrast(120%)" },
  { name: "Vintage", value: "sepia(50%) contrast(110%) brightness(90%)" },
];

export const employmentTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance",
  "Remote",
  "Temporary",
  "Casual",
  "Volunteer",
  "Self-Employed",
  "Apprenticeship",
  "Other",
] as const;

export const degreeTypes = [
  "High School",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate (PhD)",
  "Professional Degree",
  "Certificate",
  "Diploma",
  "Bootcamp",
  "Online Course",
  "Other",
] as const;

export const certificateTypes = [
  "course",
  "certification",
  "license",
  "achievement",
  "other",
] as const;

export const completionStatuses = [
  "completed",
  "in-progress",
  "expired",
] as const;

export const courseLevels = [
  "beginner",
  "intermediate",
  "advanced",
  "expert",
] as const;

export const allowedPlatforms = [
  "facebook",
  "instagram",
  "twitter",
  "linkedIn",
  "github",
  "behance",
  "dribbble",
  "whatsapp",
  "telegram",
  "youtube",
  "tiktok",
  "discord",
  "snapchat",
  "pinterest",
  "reddit",
] as const;
