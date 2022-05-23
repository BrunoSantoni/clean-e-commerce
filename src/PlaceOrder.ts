import { ItemRepository } from "./ItemRepository"
import { Order } from "./Order"
import { OrderRepository } from "./OrderRepository"

type OrderItem = {
  id: number,
  quantity: number
}

type Input = {
  cpf: string,
  orderItems: OrderItem[],
  coupon?: string
}

type Output = {
  total: Number
}

// Similar a OrderService / OrderUsecase
export class PlaceOrder {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly orderRepository: OrderRepository
  ) {}
  
  // Se fosse OrderService o método poderia se chamar placeOrder ou saveOrder
  async execute(input: Input): Promise<Output> {
    const order = new Order(input.cpf)
    
    for(const orderItem of input.orderItems) {
      const item = await this.itemRepository.get(orderItem.id)
      order.addItem(item, orderItem.quantity)
    }

    await this.orderRepository.save(order)

    return {
      total: order.getTotal()
    }
  }
}