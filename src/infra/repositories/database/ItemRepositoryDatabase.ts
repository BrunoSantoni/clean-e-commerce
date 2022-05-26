import { Connection } from "../../database/Connection";
import { Item } from "../../../domain/entities/Item";
import { ItemRepository } from "../../../domain/repositories/ItemRepository";

export class ItemRepositoryDatabase implements ItemRepository {
  constructor(
    readonly connection: Connection
  ) {}

  async list(): Promise<Item[]> {
    const itemsData = await this.connection.query('select * from ccca.item', [])
    const items: Item[] = []

    for (const itemData of itemsData) {
      items.push(new Item(itemData.id_item, itemData.description, parseFloat(itemData.price)))
    }

    return items
  }

  get(idItem: number): Promise<Item> {
    throw new Error("Method not implemented.")
  }

  save(item: Item): Promise<void> {
    throw new Error("Method not implemented.")
  }
}