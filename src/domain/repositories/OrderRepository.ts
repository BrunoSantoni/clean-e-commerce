import { Order } from "../entities/Order";

export interface OrderRepository {
  save(order: Order): Promise<void>
  count(): Promise<number>
  list(): Promise<Order[]>
  getByCode(code: string): Promise<Order>
  clear(): Promise<void>
}