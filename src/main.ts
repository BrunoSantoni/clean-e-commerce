import { Dimension } from './domain/entities/Dimension'
import { ExpressAdapter } from './infra/http/ExpressAdapter'
import { Item } from './domain/entities/Item'
import { ItemRepositoryMemory } from './infra/repositories/memory/ItemRepositoryMemory'
import { ItemController } from './infra/controllers/ItemController'
import { OrderRepositoryDatabase } from './infra/repositories/database/OrderRepositoryDatabase'
import { OrderController } from './infra/controllers/OrderController'
import { PgPromiseConnectionAdapter } from './infra/database/PgPromiseConnectionAdapter'
import { HapiAdapter } from './infra/http/HapiAdapter'

const http = new ExpressAdapter()
// const http = new HapiAdapter()

const itemRepository = new ItemRepositoryMemory()
itemRepository.save(new Item(1, 'Piano Digital', 1800, new Dimension(100, 30, 10), 3))
itemRepository.save(new Item(2, 'Pedal de sustain', 50, new Dimension(50, 50, 50), 20))
itemRepository.save(new Item(3, 'Suporte em X', 50, new Dimension(10, 10, 10), 1))

const connection = new PgPromiseConnectionAdapter()
const orderRepository = new OrderRepositoryDatabase(connection)

new ItemController(http, itemRepository)
new OrderController(http, orderRepository)

http.listen(3333)