import { OrderRepository } from "../domain/repositories/OrderRepository";

type Input = {
  code: string
}

type Output = {
  code: string,
  total: number
}

export class GetOrder {
  constructor(
    readonly orderRepository: OrderRepository
  ) {}

  async execute ({ code }: Input): Promise<Output> {
    const order = await this.orderRepository.getByCode(code)

    return {
      code: order.code.value,
      total: order.getTotal()
    }
  }
}