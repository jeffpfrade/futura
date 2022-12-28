export class User {
  id?: string;
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  wallet: number;

  constructor(
    firstName: string,
    secondName: string,
    email: string,
    password: string,
    wallet: number,
  ) {
    this.firstName = firstName;
    this.secondName = secondName;
    this.email = email;
    this.password = password;
    this.wallet = wallet;
  }
}