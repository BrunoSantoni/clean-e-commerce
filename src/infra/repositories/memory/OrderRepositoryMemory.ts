import { Order } from "../../../domain/entities/Order";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";

export class OrderRepositoryMemory implements OrderRepository {
  orders: Order[]

  constructor() {
    this.orders = []
  }

  async getByCode(code: string): Promise<Order> {
    const order = this.orders.find(order => order.code.value === code)

    if(!order) {
      throw new Error('Order not found')
    }

    return order
  }

  async count(): Promise<number> {
    return this.orders.length
  }

  async list(): Promise<Order[]> {
    return this.orders
  }

  async clear(): Promise<void> {
    this.orders = []
  }

  async save(order: Order): Promise<void> {
    this.orders.push(order)
  }

}