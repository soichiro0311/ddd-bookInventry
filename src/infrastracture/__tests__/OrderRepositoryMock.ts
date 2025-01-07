import { Order } from "../../domain/Order";
import { OrderRepository } from "../../domain/interface/OrderRepository";

export class OrderRepositoryMock implements OrderRepository {
  private store: Map<string, Order> = new Map();

  async save(order: Order): Promise<void> {
    await this.store.set(order.id(), order);
  }
  clear(): void {
    this.store.clear();
  }
  async findAll(): Promise<Order[]> {
    return Array.from(this.store.values());
  }
}
