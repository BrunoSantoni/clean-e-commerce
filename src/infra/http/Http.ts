// Toda biblioteca HTTP mapeia rotas e ouve em uma porta
export interface Http {
  on(method: string, url: string, callback: Function): Promise<void>
  listen(port: number): Promise<void>
}