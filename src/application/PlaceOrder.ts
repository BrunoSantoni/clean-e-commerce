import { ItemRepository } from "../domain/repositories/ItemRepository"
import { Order } from "../domain/entities/Order"
import { OrderRepository } from "../domain/repositories/OrderRepository"
import { CouponRepository } from "../domain/repositories/CouponRepository"

type OrderItem = {
  id: number,
  quantity: number
}

type Input = {
  cpf: string,
  orderItems: OrderItem[],
  coupon?: string
  date?: Date
}

type Output = {
  total: Number,
  code: string
}

// Similar a OrderService / OrderUsecase
export class PlaceOrder {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly orderRepository: OrderRepository,
    readonly couponRepository: CouponRepository
  ) {}
  
  // Se fosse OrderService o método poderia se chamar placeOrder ou saveOrder
  async execute(input: Input): Promise<Output> {
    const sequence = await this.orderRepository.count() + 1
    const order = new Order(input.cpf, input.date, sequence)
    
    for(const orderItem of input.orderItems) {
      const item = await this.itemRepository.get(orderItem.id)
      order.addItem(item, orderItem.quantity)
    }
    
    if(input.coupon) {
      const coupon = await this.couponRepository.get(input.coupon)
      order.addCoupon(coupon)
    }
    
    await this.orderRepository.save(order)

    return {
      total: order.getTotal(),
      code: order.code.value
    }
  }
}