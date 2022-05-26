import { ItemRepository } from "../domain/repositories/ItemRepository";

type Output = {
  idItem: number,
  description: string,
  price: number
}

export class GetItems {
  constructor(
    readonly itemRepository: ItemRepository
  ) {}

  async execute(): Promise<Output[]> {
    const items = await this.itemRepository.list()
    const output: Output[] = []

    for (const item of items) {
      output.push({
        idItem: item.id,
        description: item.description,
        price: item.price
      })
    }
    return output
  }
}