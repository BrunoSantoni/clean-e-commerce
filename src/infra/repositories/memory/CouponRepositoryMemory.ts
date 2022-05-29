import { Coupon } from "../../../domain/entities/Coupon";
import { CouponRepository } from "../../../domain/repositories/CouponRepository";

export class CouponRepositoryMemory implements CouponRepository {
  coupons: Coupon[]
  
  constructor() {
    this.coupons = []

  }

  async get(code: string): Promise<Coupon> {
    const coupon = this.coupons.find(c => c.code === code)

    if(!coupon) {
      throw new Error('Coupon not found')
    }

    return coupon
  }

  async save(coupon: Coupon): Promise<void> {
    this.coupons.push(coupon)
  }
}