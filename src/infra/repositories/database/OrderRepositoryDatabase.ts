import { Order } from "../../../domain/entities/Order";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import { Connection } from "../../database/Connection";

export class OrderRepositoryDatabase implements OrderRepository {
  constructor (
    readonly connection: Connection
  ) {}

  async save(order: Order): Promise<void> {
    const [orderData] = await this.connection.query(`insert into ccca.order
      (code, cpf, issue_date, freight, sequence, total, coupon)
      values ($1, $2, $3, $4, $5, $6, $7) returning *`,
      [
        order.code.value,
        order.document.value,
        order.date,
        order.freight.getTotal(),
        order.sequence,
        order.getTotal(),
        order.coupon?.code
      ]
    )

    for (const orderItem of order.orderItems) {
      await this.connection.query(`insert into ccca.order_item
        (id_order, id_item, price, quantity)
        values ($1, $2, $3, $4)`,
        [
          orderData.idOrder,
          orderItem.id,
          orderItem.price,
          orderItem.quantity
        ]
      )
    }
  }
  
  async count(): Promise<number> {
    const [row] = await this.connection.query('select count(*)::int from ccca.order', [])
    return row.count
  }

}