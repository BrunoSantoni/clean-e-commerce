import { OrderItem } from "../../src/domain/entities/OrderItem"

it('should create an OrderItem', function() {
  const orderItem = new OrderItem(1, 100, 2)

  expect(orderItem.idItem).toBe(1)
  expect(orderItem.price).toBe(100)
  expect(orderItem.quantity).toBe(2)
  expect(orderItem.getTotal()).toBe(200)
})

it('should throw an exception if quantity is negative', function() {
  expect(() => new OrderItem(1, 100, -1)).toThrow(new Error('Invalid quantity'))
})