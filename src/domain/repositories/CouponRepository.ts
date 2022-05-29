import { Coupon } from "../entities/Coupon";

export interface CouponRepository {
  get(code: string): Promise<Coupon>
  save(coupon: Coupon): Promise<void>
}