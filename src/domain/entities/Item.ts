import { Dimension } from "./Dimension"

export class Item {
  constructor(
    readonly id: number,
    readonly description: string,
    readonly price: number,
    readonly dimension?: Dimension,
    readonly weight?: number
  ) {
    if (weight && weight < 0) {
      throw new Error('Invalid weight')
    }
  }

  // Para as outras classes não conhecerem as dimensões, cria um método para abstrair essa chamada
  getVolume() {
    if(this.dimension) {
      return this.dimension.getVolume()
    }

    return 0
  }

  getDensity() {
    if(this.weight && this.dimension) {
      return this.weight / this.getVolume()
    }

    return 0
  }
}