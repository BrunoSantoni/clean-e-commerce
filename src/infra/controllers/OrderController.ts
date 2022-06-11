import { GetOrder } from "../../application/GetOrder";
import { GetOrders } from "../../application/GetOrders";
import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { Http } from "../http/Http";

export class OrderController {
  constructor(
    readonly http: Http,
    readonly orderRepository: OrderRepository
  ) {
    http.on('get', '/orders', async function(params: any, body: any) {
      const getOrders = new GetOrders(orderRepository)
      const output = await getOrders.execute()
    
      return output
    })

    http.on('get', '/order/:code', async function(params: any, body: any) {
      const getOrder = new GetOrder(orderRepository)
      const output = await getOrder.execute({ code: params.code })
    
      return output
    })
  }
}