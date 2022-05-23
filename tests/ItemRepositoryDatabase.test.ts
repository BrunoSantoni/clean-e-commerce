import { ItemRepositoryDatabase } from "../src/ItemRepositoryDatabase"
import { PgPromiseConnectionAdapter } from "../src/PgPromiseConnectionAdapter"

it('should return database items', async function() {
  const connection = new PgPromiseConnectionAdapter()
  const itemRepository = new ItemRepositoryDatabase(connection)
  
  const items = await itemRepository.list()

  expect(items).toHaveLength(3)
})