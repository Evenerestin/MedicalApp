export interface User {
  id: string;
  email: string;
  name: string;
  dateOfBirth?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  credentials?: {
    email: string;
    password: string;
  };
}
