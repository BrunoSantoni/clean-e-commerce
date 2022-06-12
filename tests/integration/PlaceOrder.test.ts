import { PlaceOrder } from "../../src/application/PlaceOrder"
import { Connection } from "../../src/infra/database/Connection"
import { OrderRepository } from "../../src/domain/repositories/OrderRepository"
import { PgPromiseConnectionAdapter } from "../../src/infra/database/PgPromiseConnectionAdapter"
import { RepositoryFactory } from "../../src/domain/factories/RepositoryFactory"
import { DatabaseRepositoryFactory } from "../../src/infra/factories/DatabaseRepositoryFactory"

// Use case
// Screaming Architecutre

let connection: Connection
let orderRepository: OrderRepository
let repositoryFactory: RepositoryFactory

beforeEach(async function() {
  connection = new PgPromiseConnectionAdapter()
  repositoryFactory = new DatabaseRepositoryFactory(connection)
  orderRepository = repositoryFactory.createOrderRepository()
  await orderRepository.clear()
})

it('should make an order', async function() {
  const placeOrder = new PlaceOrder(repositoryFactory)

  const input = {
    cpf: '935.411.347-80',
    orderItems: [
      { id: 1, quantity: 1 },
      { id: 2, quantity: 1 },
      { id: 3, quantity: 3 }
    ]
  }

  const output = await placeOrder.execute(input)

  expect(output.total).toBe(2260)
})

it('should make an order with discount', async function() {
  const tomorrow = new Date()
  tomorrow.setDate(new Date().getDate() + 1)

  const placeOrder = new PlaceOrder(repositoryFactory)

  const input = {
    cpf: '935.411.347-80',
    orderItems: [
      { id: 1, quantity: 1 },
      { id: 2, quantity: 1 },
      { id: 3, quantity: 3 }
    ],
    coupon: 'TEST10',
    date: tomorrow
  }

  const output = await placeOrder.execute(input)

  expect(output.total).toBe(2060)
})

it('should make an order and generate order code', async function() {
  const placeOrder = new PlaceOrder(repositoryFactory)

  const input = {
    cpf: '935.411.347-80',
    orderItems: [
      { id: 1, quantity: 1 },
      { id: 2, quantity: 1 },
      { id: 3, quantity: 3 }
    ],
    date: new Date('2022-05-01T10:00:00')
  }

  const output = await placeOrder.execute(input)

  expect(output.code).toBe('202200000001')
})

afterEach(async function() {
  await connection.close()
})