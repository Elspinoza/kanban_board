export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  PRODUCT_OWNER = 'PRODUCT_OWNER',
  SCRUM_MASTER = 'SCRUM_MASTER',
  DEVELOPER = 'DEVELOPER'
}

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}
