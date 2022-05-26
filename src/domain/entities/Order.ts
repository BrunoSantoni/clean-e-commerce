import { Coupon } from "./Coupon";
import { Cpf } from "./Cpf";
import { Freight } from "./Freight";
import { Item } from "./Item";
import { OrderCode } from "./OrderCode";
import { OrderItem } from "./OrderItem";

export class Order {
  document: Cpf
  orderItems: OrderItem[]
  coupon?: Coupon
  freight = new Freight()
  code: OrderCode

  constructor(document: string, readonly date = new Date(), readonly sequence: number = 1) {
    this.document = new Cpf(document)
    this.orderItems = []
    this.code = new OrderCode(date, sequence)
  }

  addItem(item: Item, quantity: number) {
    this.freight.addItem(item, quantity)

    this.orderItems.push(new OrderItem(item.id, item.price, quantity))
  }

  addCoupon(coupon: Coupon) {
    if(!coupon.isExpired(this.date)) {
      this.coupon = coupon
    }
  }

  getFreight() {
    return this.freight.getTotal()
  }

  getTotal() {
    let total = this.orderItems.reduce((acc, orderItem) => {
      return acc += orderItem.getTotal()
    }, 0)

    if(this.coupon) {
      total -= this.coupon.calculateDiscount(total)
    }

    total += this.getFreight()

    return total
  }
}