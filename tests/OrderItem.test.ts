import { OrderItem } from "../src/OrderItem"

it('should create an OrderItem', function() {
  const orderItem = new OrderItem(1, 100, 2)

  expect(orderItem.id).toBe(1)
  expect(orderItem.price).toBe(100)
  expect(orderItem.quantity).toBe(2)
  expect(orderItem.getTotal()).toBe(200)
})