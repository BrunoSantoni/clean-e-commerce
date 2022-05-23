import axios from "axios"

it.skip('should call /items', async function () {
  const response = await axios({
    url: 'http://localhost:3333/items',
    method: 'get'
  })

  const items = response.data

  expect(items).toHaveLength(3)
})