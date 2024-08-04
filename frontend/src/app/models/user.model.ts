import { Role } from './role.model';

export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public gender: string,
    public about: string, //  .....
    public roles: Role[] = [],
    public userId: string = '',
    public imageName: string = ''
  ) {}
}

export interface UsersResponse {
  lastPage: boolean;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  content: User[];
}
