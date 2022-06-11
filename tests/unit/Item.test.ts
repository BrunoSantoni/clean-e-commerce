import { Dimension } from "../../src/domain/entities/Dimension"
import { Item } from "../../src/domain/entities/Item"

it('should throw an exception if weight if negative', function() {
  expect(() => new Item(1, 'Piano Digital', 1800, new Dimension(100, 30, 10), -3)).toThrow(new Error('Invalid weight'))
})