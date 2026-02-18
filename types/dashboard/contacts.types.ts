export interface SingleContactType {
  platform: string;
  url: string;
  _id: string;
}

export interface ContactsTypes {
  socialLinks: SingleContactType[];
}
