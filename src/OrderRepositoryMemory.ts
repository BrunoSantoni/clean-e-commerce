import { Order } from "./Order";
import { OrderRepository } from "./OrderRepository";

export class OrderRepositoryMemory implements OrderRepository {
  orders: Order[]

  constructor() {
    this.orders = []
  }

  async save(order: Order): Promise<void> {
    this.orders.push(order)
  }

}