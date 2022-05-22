import { Coupon } from "../src/Coupon"

it('should create a Coupon', function() {
  const coupon = new Coupon('TEST10', 10)

  expect(coupon.calculateDiscount(100)).toBe(10)
})

it('should create an expired coupon', function() {
  const coupon = new Coupon('TEST20', 20, new Date('2022-05-01T10:00:00'))
  const isExpired = coupon.isExpired(new Date('2022-10-01T10:00:00'))

  expect(isExpired).toBe(true)
})