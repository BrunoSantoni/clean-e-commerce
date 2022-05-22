import { Dimension } from "../src/Dimension"
import { Freight } from "../src/Freight"
import { Item } from "../src/Item"

it('should calculate freight', function () {
  const freight = new Freight()
  freight.addItem(new Item(1, 'Piano Digital', 1800, new Dimension(100, 30, 10), 3), 1)
  freight.addItem(new Item(1, 'Pedal de sustain', 50, new Dimension(50, 50, 50), 20), 1)
  freight.addItem(new Item(1, 'Suporte em X', 50, new Dimension(10, 10, 10), 1), 3)

  const total = freight.getTotal()

  expect(total).toBe(260)
})

it('should calculate freight with minimum freight price', function () {
  const freight = new Freight()
  freight.addItem(new Item(1, 'Suporte em X', 50, new Dimension(10, 10, 10), 0.9), 1)

  const total = freight.getTotal()

  expect(total).toBe(10)
})