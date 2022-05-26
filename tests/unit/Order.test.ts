import { Coupon } from "../../src/domain/entities/Coupon";
import { Dimension } from "../../src/domain/entities/Dimension";
import { Item } from "../../src/domain/entities/Item";
import { Order } from "../../src/domain/entities/Order";

it('should not create an order with an invalid document', function() {
  expect(() => new Order('111.111.111-11')).toThrow(new Error('Invalid document'));
})

it('should create an order with three items containing description, price and quantity', function() {
  const order = new Order('935.411.347-80')
  order.addItem(new Item(1, 'Piano Digital', 1800), 1)
  order.addItem(new Item(2, 'Pedal de sustain', 50), 1)
  order.addItem(new Item(3, 'Suporte em X', 50), 3)

  const total = order.getTotal()

  expect(total).toBe(2000)
})

it('should create an order with discount coupon', function() {
  const order = new Order('935.411.347-80')
  order.addItem(new Item(1, 'Piano Digital', 1800), 1)
  order.addItem(new Item(2, 'Pedal de sustain', 50), 1)
  order.addItem(new Item(3, 'Suporte em X', 50), 3)
  order.addCoupon(new Coupon('VALE10', 10))

  const total = order.getTotal()

  expect(total).toBe(1800)
})

it('should create an order with expired discount coupon', function() {
  const order = new Order('935.411.347-80', new Date('2022-10-01T10:00:00'))
  order.addItem(new Item(1, 'Piano Digital', 1800), 1)
  order.addItem(new Item(2, 'Pedal de sustain', 50), 1)
  order.addItem(new Item(3, 'Suporte em X', 50), 3)
  order.addCoupon(new Coupon('VALE10', 10, new Date('2022-05-01T10:00:00')))

  const total = order.getTotal()

  expect(total).toBe(2000)
})

it('should create an order with three items and calculate the freight', function() {
  const order = new Order('935.411.347-80')
  order.addItem(new Item(1, 'Piano Digital', 1800, new Dimension(100, 30, 10), 3), 1)
  order.addItem(new Item(2, 'Pedal de sustain', 50, new Dimension(50, 50, 50), 20), 1)
  order.addItem(new Item(3, 'Suporte em X', 50, new Dimension(10, 10, 10), 1), 3)

  const freight = order.getFreight()
  const total = order.getTotal()

  expect(freight).toBe(260)
  expect(total).toBe(2260)
})

it('should create an order and generate a code following the pattern YYYYPPPPPPPP', () => {
  const order = new Order('935.411.347-80', new Date('2022-05-01T10:00:00'), 1)
  order.addItem(new Item(1, 'Piano Digital', 1800), 1)
  order.addItem(new Item(2, 'Pedal de sustain', 50), 1)
  order.addItem(new Item(3, 'Suporte em X', 50), 3)

  const code = order.code.value

  expect(code).toBe('202200000001')
})