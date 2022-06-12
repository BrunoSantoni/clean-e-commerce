import Hapi from '@hapi/hapi'
import { Http } from "./Http"

export class HapiAdapter implements Http {
  private server: Hapi.Server

  constructor() {
    this.server = Hapi.server({})
  }

  async on(method: string, url: string, callback: Function): Promise<void> {
    this.server.route({
      method,
      path: url,
      handler(request: Hapi.Request) {
        return callback(request.params, request.response)
      }
    })
  }

  async listen(port: number): Promise<void> {
    this.server.settings.port = port
    this.server.start()
  }
}