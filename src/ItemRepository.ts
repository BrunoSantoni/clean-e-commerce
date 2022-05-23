import { Item } from "./Item";

export interface ItemRepository {
  list(): Promise<Item[]>
  get(idItem: number): Promise<Item>
  save(item: Item): Promise<void>
}