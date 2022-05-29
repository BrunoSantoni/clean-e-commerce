import { Coupon } from "../../src/domain/entities/Coupon"

it('should create an expired coupon', function() {
  const coupon = new Coupon('TEST20', 20, new Date('2022-05-01T10:00:00'))
  const isExpired = coupon.isExpired(new Date('2022-10-01T10:00:00'))

  expect(isExpired).toBe(true)
})