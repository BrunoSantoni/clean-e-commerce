import { SimulateFreight } from "../../src/application/SimulateFreight"
import { Dimension } from "../../src/domain/entities/Dimension"
import { Item } from "../../src/domain/entities/Item"
import { ItemRepositoryMemory } from "../../src/infra/repositories/memory/ItemRepositoryMemory"

it('should simulate the order freight', async function() {
  const itemRepository = new ItemRepositoryMemory()
  itemRepository.save(new Item(1, 'Piano Digital', 1800, new Dimension(100, 30, 10), 3))
  itemRepository.save(new Item(2, 'Pedal de sustain', 50, new Dimension(50, 50, 50), 20))
  itemRepository.save(new Item(3, 'Suporte em X', 50, new Dimension(10, 10, 10), 1))
  const simulateFreight = new SimulateFreight(itemRepository)

  const input = {
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 }
    ]
  }

  const output = await simulateFreight.execute(input)

  expect(output.total).toBe(260)
})