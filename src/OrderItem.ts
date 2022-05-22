export class OrderItem {
  constructor(
    readonly id: number,
    readonly price: number,
    readonly quantity: number
  ) {}

  getTotal() {
    return this.price * this.quantity
  }
}