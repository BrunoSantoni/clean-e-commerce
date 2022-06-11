import { ItemRepositoryDatabase } from "../../src/infra/repositories/database/ItemRepositoryDatabase"
import { PgPromiseConnectionAdapter } from "../../src/infra/database/PgPromiseConnectionAdapter"

it('should return database items', async function() {
  const connection = new PgPromiseConnectionAdapter()
  const itemRepository = new ItemRepositoryDatabase(connection)
  
  const items = await itemRepository.list()

  expect(items).toHaveLength(3)

  await connection.close()
})