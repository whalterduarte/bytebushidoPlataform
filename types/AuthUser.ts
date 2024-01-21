import { User } from "./User";

export type AuthUser = User & {
  role: string;
};
