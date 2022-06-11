import { GetOrder } from "../../src/application/GetOrder"
import { GetOrders } from "../../src/application/GetOrders"
import { PlaceOrder } from "../../src/application/PlaceOrder"
import { Coupon } from "../../src/domain/entities/Coupon"
import { Dimension } from "../../src/domain/entities/Dimension"
import { Item } from "../../src/domain/entities/Item"
import { OrderRepository } from "../../src/domain/repositories/OrderRepository"
import { Connection } from "../../src/infra/database/Connection"
import { PgPromiseConnectionAdapter } from "../../src/infra/database/PgPromiseConnectionAdapter"
import { OrderRepositoryDatabase } from "../../src/infra/repositories/database/OrderRepositoryDatabase"
import { CouponRepositoryMemory } from "../../src/infra/repositories/memory/CouponRepositoryMemory"
import { ItemRepositoryMemory } from "../../src/infra/repositories/memory/ItemRepositoryMemory"

let connection: Connection
let orderRepository: OrderRepository

beforeEach(async function() {
  connection = new PgPromiseConnectionAdapter()
  orderRepository = new OrderRepositoryDatabase(connection)
  await orderRepository.clear()
})

it('should obtain an order by code', async function() {
  const itemRepository = new ItemRepositoryMemory()
  const couponRepository = new CouponRepositoryMemory()
  itemRepository.save(new Item(1, 'Piano Digital', 1800, new Dimension(100, 30, 10), 3))
  itemRepository.save(new Item(2, 'Pedal de sustain', 50, new Dimension(50, 50, 50), 20))
  itemRepository.save(new Item(3, 'Suporte em X', 50, new Dimension(10, 10, 10), 1))
  couponRepository.save(new Coupon('TEST10', 10, new Date('2022-05-01T10:00:00')))
  const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository)

  const input = {
    cpf: '935.411.347-80',
    orderItems: [
      { id: 1, quantity: 1 },
      { id: 2, quantity: 1 },
      { id: 3, quantity: 3 }
    ],
    coupon: 'TEST10',
    date: new Date('2022-03-01T12:00:00')
  }

  await placeOrder.execute(input)

  const getOrder = new GetOrder(orderRepository)

  const output = await getOrder.execute({
    code: '202200000001'
  })

  expect(output.code).toBe('202200000001')
  expect(output.total).toBe(2060)
})

afterEach(async function() {
  await connection.close()
})