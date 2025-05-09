export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  balance: number;
}

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  balance: number;
}
export interface UserAuth {
  email: string;
  roles: string[];
}
