import { Coupon } from "./Coupon";
import { Cpf } from "./Cpf";
import { Item } from "./Item";
import { OrderItem } from "./OrderItem";

export class Order {
  document: Cpf
  orderItems: OrderItem[]
  coupon?: Coupon

  constructor(document: string) {
    this.document = new Cpf(document)
    this.orderItems = []
  }

  addItem(item: Item, quantity: number) {
    this.orderItems.push(new OrderItem(item.id, item.price, quantity))
  }

  addCoupon(coupon: Coupon) {
    this.coupon = coupon
  }

  getTotal() {
    let total = this.orderItems.reduce((acc, orderItem) => {
      return acc += orderItem.getTotal()
    }, 0)

    if(this.coupon) {
      total -= this.coupon.calculateDiscount(total)
    }

    return total
  }
}