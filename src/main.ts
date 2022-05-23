import { Dimension } from './Dimension'
import { ExpressAdapter } from './ExpressAdapter'
import { GetItems } from './GetItems'
import { Item } from './Item'
import { ItemRepositoryMemory } from './ItemRepositoryMemory'

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