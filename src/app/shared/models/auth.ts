import { User } from "./user";

export interface HttpAuthResponse {
  accessToken : string;
  user: Partial<User>;
}
