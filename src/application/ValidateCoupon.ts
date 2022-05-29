import { CouponRepository } from "../domain/repositories/CouponRepository";

type Input = {
  code: string,
  date: Date
}

type Output = {
  isExpired: boolean
}

export class ValidateCoupon {
  constructor(
    readonly couponRepository: CouponRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const coupon = await this.couponRepository.get(input.code)
    const isExpired = coupon.isExpired(input.date)

    return {
      isExpired
    }
  }
}