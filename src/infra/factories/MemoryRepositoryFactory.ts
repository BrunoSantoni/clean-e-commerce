import { RepositoryFactory } from "../../domain/factories/RepositoryFactory";
import { CouponRepository } from "../../domain/repositories/CouponRepository";
import { ItemRepository } from "../../domain/repositories/ItemRepository";
import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { CouponRepositoryMemory } from "../repositories/memory/CouponRepositoryMemory";
import { ItemRepositoryMemory } from "../repositories/memory/ItemRepositoryMemory";
import { OrderRepositoryMemory } from "../repositories/memory/OrderRepositoryMemory";

export class MemoryRepositoryFactory implements RepositoryFactory {
  createItemRepository(): ItemRepository {
    return new ItemRepositoryMemory()
  }
  createOrderRepository(): OrderRepository {
    return new OrderRepositoryMemory()
  }
  createCouponRepository(): CouponRepository {
    return new CouponRepositoryMemory()
  }

}