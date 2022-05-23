import { Dimension } from "../../src/domain/entities/Dimension"

it('should create the dimensions', function() {
  const dimension = new Dimension(100, 30, 10)
  const volume = dimension.getVolume()

  expect(volume).toBe(0.03)
})