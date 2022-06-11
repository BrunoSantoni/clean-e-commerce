import { Item } from "./Item";

export class Freight {
  // É private pq senão qualquer um de fora poderia levar o objeto de frete a um estado inválido (passando -1 pro total por exemplo)
  total = 0

  // Eliminando magic numbers
  private DISTANCE = 1000
  private FACTOR = 100
  private MINIMUM_FREIGHT = 10

  addItem(item: Item, quantity: number) {
    const freight = item.getVolume() * this.DISTANCE * (item.getDensity() / this.FACTOR)
    this.total += freight * quantity
  }
  
  getTotal() {
    return this.total > 0 && this.total < this.MINIMUM_FREIGHT ? this.MINIMUM_FREIGHT : this.total
  }
}