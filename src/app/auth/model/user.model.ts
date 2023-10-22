export class UserDTO {
  _id: string;
  userName: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  createdAt: number;
  updatedAt: number;

  constructor(
    _id: string,
    userName: string,
    password: string,
    name: string,
    role: string,
    avatar: string,
    createdAt: number,
    updatedAt: number,
  ) {
    this._id = _id;
    this.userName = userName;
    this.password = password;
    this.name = name;
    this.role = role;
    this.avatar = avatar;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
