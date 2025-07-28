
export interface IAddress {
  street: string;
  city: string;
  zipCode: number;
}   
export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt?: Date;
  address?: IAddress;

}
