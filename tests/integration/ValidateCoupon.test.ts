import { ValidateCoupon } from "../../src/application/ValidateCoupon"
import { Coupon } from "../../src/domain/entities/Coupon"
import { CouponRepositoryMemory } from "../../src/infra/repositories/memory/CouponRepositoryMemory"

it('should validate expired discount coupon', async function() {
  const couponRepository = new CouponRepositoryMemory()
  couponRepository.save(new Coupon('TEST10', 10, new Date('2020-05-01T10:00:00Z')))
  const validateCoupon = new ValidateCoupon(couponRepository)

  const input = {
    code: 'TEST10',
    date: new Date('2020-05-10T10:00:00Z')
  }

  const output = await validateCoupon.execute(input)

  expect(output.isExpired).toBe(true)
})

it('should validate valid discount coupon', async function() {
  const couponRepository = new CouponRepositoryMemory()
  couponRepository.save(new Coupon('TEST10', 10, new Date('2020-05-30T10:00:00Z')))
  const validateCoupon = new ValidateCoupon(couponRepository)

  const input = {
    code: 'TEST10',
    date: new Date('2020-05-10T10:00:00Z')
  }

  const output = await validateCoupon.execute(input)

  expect(output.isExpired).toBe(false)
})