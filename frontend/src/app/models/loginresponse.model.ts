import { User } from './user.model';

export interface LoginResponse {
  jwtToken: string;
  user: User | undefined;
  login: boolean;
}
