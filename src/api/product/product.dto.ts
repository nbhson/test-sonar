export class ProductDTO {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  createdAt: number;
  updatedAt: number;
  categoryId: string;

  constructor(
    id: string,
    name: string,
    image: string,
    price: number,
    description: string,
    createdAt: number,
    updatedAt: number,
    categoryId: string,
  ) {
    this._id = id;
    this.name = name;
    this.image = image;
    this.price = price;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.categoryId = categoryId;
  }
}
