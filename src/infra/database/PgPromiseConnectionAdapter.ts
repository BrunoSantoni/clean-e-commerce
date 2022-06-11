import pgp from 'pg-promise'
import { Connection } from "./Connection"

export class PgPromiseConnectionAdapter implements Connection {
  pgp: any

  constructor() {
    this.pgp = pgp()('postgres://postgres:postgres@localhost:5432/postgres')
  }

  query(statement: string, params: any): Promise<any> {
    return this.pgp.query(statement, params)
  }

  close(): Promise<void> {
    return this.pgp.$pool.end()
  }

}