export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  //   token???
  credentials: {
    email: string;
    password: string;
  };
}
