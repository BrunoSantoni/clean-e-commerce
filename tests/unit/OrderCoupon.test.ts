import { Coupon } from "../../src/domain/entities/Coupon"
import { OrderCoupon } from "../../src/domain/entities/OrderCoupon"

it('should calculate a coupon discount', function() {
  const coupon = new Coupon('TEST10', 10)
  const orderCoupon = new OrderCoupon(coupon.code, coupon.percentage)

  expect(orderCoupon.calculateDiscount(100)).toBe(10)
})