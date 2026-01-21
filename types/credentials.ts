export interface Credentials {
  email: string;
  password: string;
}

export interface Token extends Credentials {
  firstName: string;
  lastName: string;
}
