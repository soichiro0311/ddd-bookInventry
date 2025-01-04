import { Order } from "../domain/Order";
import { OrderRepository } from "../domain/interface/OrderRepository";

export class OrderRepositoryImpl
  implements OrderRepository
{
  save(transaction: Order): void {
    throw new Error("Method not implemented.");
  }
}
