import { Dimension } from './domain/entities/Dimension'
import { ExpressAdapter } from './infra/http/ExpressAdapter'
import { GetItems } from './application/GetItems'
import { Item } from './domain/entities/Item'
import { ItemRepositoryMemory } from './infra/repositories/memory/ItemRepositoryMemory'

const http = new ExpressAdapter()

const itemRepository = new ItemRepositoryMemory()
itemRepository.save(new Item(1, 'Piano Digital', 1800, new Dimension(100, 30, 10), 3))
itemRepository.save(new Item(2, 'Pedal de sustain', 50, new Dimension(50, 50, 50), 20))
itemRepository.save(new Item(3, 'Suporte em X', 50, new Dimension(10, 10, 10), 1))

http.on('get', '/items', async function(params: any, body: any) {

  const getItems = new GetItems(itemRepository)
  const output = await getItems.execute()

  return output
})

http.listen(3333)