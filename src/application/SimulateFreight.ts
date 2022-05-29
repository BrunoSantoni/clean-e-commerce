import { Freight } from "../domain/entities/Freight"
import { ItemRepository } from "../domain/repositories/ItemRepository"

type Input = {
  orderItems: Array<{
    idItem: number,
    quantity: number
  }>
}

type Output = {
  total: number
}

export class SimulateFreight {
  constructor(
    readonly itemRepository: ItemRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const freight = new Freight()

    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.get(orderItem.idItem)
      freight.addItem(item, orderItem.quantity)
    }

    return {
      total: freight.getTotal()
    }
  }
}