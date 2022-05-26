import { OrderCode } from "../../src/domain/entities/OrderCode"

it('should generate a code for an order', () => {
  const orderCode = new OrderCode(new Date('2022-05-01T10:00:00'), 1)
  expect(orderCode.value).toBe('202200000001')
})