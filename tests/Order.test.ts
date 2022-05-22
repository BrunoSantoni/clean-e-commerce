import { Coupon } from "../src/Coupon";
import { Item } from "../src/Item";
import { Order } from "../src/Order";

it('should not create an order with an invalid document', function() {
  expect(() => new Order('111.111.111-11')).toThrow(new Error('Invalid document'));
})

it('should create an order with three items containing description, price and quantity', function() {
  const order = new Order('935.411.347-80')
  order.addItem(new Item(1, 'Piano Digital', 1800), 1)
  order.addItem(new Item(1, 'Pedal de sustain', 50), 1)
  order.addItem(new Item(1, 'Suporte em X', 50), 3)

  const total = order.getTotal()

  expect(total).toBe(2000)
})

it('should create a discount coupon', function() {
  const order = new Order('935.411.347-80')
  order.addItem(new Item(1, 'Piano Digital', 1800), 1)
  order.addItem(new Item(1, 'Pedal de sustain', 50), 1)
  order.addItem(new Item(1, 'Suporte em X', 50), 3)
  order.addCoupon(new Coupon('VALE10', 10))

  const total = order.getTotal()

  expect(total).toBe(1800)
})