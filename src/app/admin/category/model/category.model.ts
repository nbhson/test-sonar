export class Category {
  _id: string;
  name: string;
  image: string;
  createdAt: number;
  updatedAt: number;
  displayCreatedAt: string;
  couterProduct: number;

  constructor(
    id: string,
    name: string,
    image: string,
    createdAt: number,
    updatedAt: number,
    displayCreatedAt: string,
    couterProduct: number,
  ) {
    this._id = id;
    this.name = name;
    this.image = image;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.displayCreatedAt = displayCreatedAt;
    this.couterProduct = couterProduct;
  }
}
