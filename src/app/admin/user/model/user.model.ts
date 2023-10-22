export class User {
  id: string;
  userName: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  createdAt: number;
  updatedAt: number;
  displayCreatedAt: string;

  constructor(
    id: string,
    userName: string,
    password: string,
    name: string,
    role: string,
    avatar: string,
    createdAt: number,
    updatedAt: number,
    displayCreatedAt: string,
  ) {
    this.id = id;
    this.userName = userName;
    this.password = password;
    this.name = name;
    this.role = role;
    this.avatar = avatar;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.displayCreatedAt = displayCreatedAt;
  }
}
