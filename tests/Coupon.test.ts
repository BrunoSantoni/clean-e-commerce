import { Coupon } from "../src/Coupon"

it('should create a Coupon', function() {
  const coupon = new Coupon('TEST10', 10)

  expect(coupon.calculateDiscount(100)).toBe(10)
})