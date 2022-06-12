import express, { Express } from 'express'
import { Http } from "./Http"

type MethodTypes = 'get' | 'post' | 'put' | 'delete'

export class ExpressAdapter implements Http {
  private app: Express

  constructor() {
    this.app = express()
  }

  private parseUrl (url: string) {
		return url.replace(/\{/g, ":").replace(/\}/g, "");
	}

  async on(method: MethodTypes, url: string, callback: Function): Promise<void> {
    this.app[method](this.parseUrl(url), async function(req: any, res: any) {
      const output = await callback(req.params, req.body)

      res.json(output)
    })
  }

  async listen(port: number): Promise<void> {
    this.app.listen(port, function() {
      console.log(`Server started on port ${port}!`)
    })
  }
}