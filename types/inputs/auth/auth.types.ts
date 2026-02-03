interface SignInType {
  email: string;
  password: string;
}

interface SignUpType {
  email: string;
  password: string;
  role: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
}

export type { SignInType, SignUpType };
