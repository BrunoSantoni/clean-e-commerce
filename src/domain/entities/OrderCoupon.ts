// A order não pode reter um coupon diretamente pois estaria criando dependência
// entre agregados diferentes, por isso criou OrderCoupon.
export class OrderCoupon {
  constructor(
    readonly code: string,
    readonly percentage: number,
  ) {}

  // Esse método estava em coupon, mas como usa em order, trouxe para cá.
  calculateDiscount(total: number): number {
    return total * (this.percentage / 100)
  }
}