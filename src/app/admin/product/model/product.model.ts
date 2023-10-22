export class Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  priceDisplay: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  displayCreatedAt: string;
  categoryId: string;
  categoryName: string;

  constructor(
    id: string,
    name: string,
    image: string,
    price: number,
    priceDisplay: string,
    description: string,
    createdAt: number,
    updatedAt: number,
    displayCreatedAt: string,
    categoryId: string,
    categoryName: string,
  ) {
    this._id = id;
    this.name = name;
    this.image = image;
    this.price = price;
    this.priceDisplay = priceDisplay;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.displayCreatedAt = displayCreatedAt;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
  }
}
