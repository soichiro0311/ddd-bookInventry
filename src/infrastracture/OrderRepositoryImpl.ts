import { PrismaClient } from "@prisma/client";
import { Order } from "../domain/Order";
import { OrderRepository } from "../domain/interface/OrderRepository";

export class OrderRepositoryImpl implements OrderRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });
  }

  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
  clear(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async save(order: Order): Promise<void> {
    await this.prisma.order.create({
      data: {
        id: order.id(),
        userId: order.userId(),
        orderBookCount: order.orderBookCount(),
        status: order.status(),
        isbnCode: order.isbnCode(),
        bookStore: {
          connect: { id: order.bookStoreId() },
        },
      },
    });
  }
}
