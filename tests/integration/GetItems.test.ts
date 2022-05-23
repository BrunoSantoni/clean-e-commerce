import { Dimension } from "../../src/domain/entities/Dimension"
import { GetItems } from "../../src/application/GetItems"
import { Item } from "../../src/domain/entities/Item"
import { ItemRepositoryMemory } from "../../src/infra/repositories/memory/ItemRepositoryMemory"

it('should get the items', async function() {
  const itemRepository = new ItemRepositoryMemory()
  itemRepository.save(new Item(1, 'Piano Digital', 1800, new Dimension(100, 30, 10), 3))
  itemRepository.save(new Item(2, 'Pedal de sustain', 50, new Dimension(50, 50, 50), 20))
  itemRepository.save(new Item(3, 'Suporte em X', 50, new Dimension(10, 10, 10), 1))

  const getItems = new GetItems(itemRepository)

  const output = await getItems.execute()

  expect(output).toHaveLength(3)
})