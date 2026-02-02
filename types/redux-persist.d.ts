declare module "redux-persist/lib/storage/createWebStorage" {
  type StorageValue = string | null;

  export interface WebStorage {
    getItem(key: string): Promise<StorageValue>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
  }

  export default function createWebStorage(
    type: "local" | "session",
  ): WebStorage;
}
