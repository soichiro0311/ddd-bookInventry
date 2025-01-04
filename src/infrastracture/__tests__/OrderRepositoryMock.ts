import { Order } from "../../domain/Order";
import { OrderRepository } from "../../domain/interface/OrderRepository";

export class OrderRepositoryMock
  implements OrderRepository
{
  private store: Map<string, Order> = new Map();

  save(order: Order): void {
    this.store.set(order.id(), order);
  }
}
