import { Order } from "../../../domain/entities/Order";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";

export class OrderRepositoryMemory implements OrderRepository {
  orders: Order[]

  constructor() {
    this.orders = []
  }

  async count(): Promise<number> {
    return this.orders.length
  }

  async save(order: Order): Promise<void> {
    this.orders.push(order)
  }

}