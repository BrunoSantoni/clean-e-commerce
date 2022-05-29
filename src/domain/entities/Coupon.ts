export class Coupon {
  constructor (
    readonly code: string,
    readonly percentage: number,
    readonly expirationDate = new Date()
  ) {}

  calculateDiscount(total: number): number {
    return total * (this.percentage / 100)
  }

  isExpired(today: Date) {
    console.log(today)
    console.log(this.expirationDate)
    // getTime -> Tempo em ms desde 1970
    return today.getTime() > this.expirationDate.getTime()
  }
}