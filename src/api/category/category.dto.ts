export class CategoryDTO {
  _id: string;
  name: string;
  image: string;
  createdAt: number;
  updatedAt: number;

  constructor(_id: string, name: string, image: string, createdAt: number, updatedAt: number) {
    this._id = _id;
    this.name = name;
    this.image = image;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
