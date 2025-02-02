import { BookStoreRepository } from "../domain/interface/BookStoreRepository";
import { OrderRepository } from "../domain/interface/OrderRepository";
import { TransactionRepository } from "../domain/interface/TransactionRepository";
import { Order } from "../domain/Order";
import { Transaction } from "../domain/Transaction";
import { myContainer } from "../inversify.config";

import { TYPES } from "../types";
import { OrderPlaceRequest } from "./dto/request/OrderPlaceRequest";

export class OrderBook {
  private bookStoreRepository = myContainer.get<BookStoreRepository>(
    TYPES.BookStoreRepository
  );
  private transactionRepository = myContainer.get<TransactionRepository>(
    TYPES.TransactionRepository
  );
  private orderRepository = myContainer.get<OrderRepository>(
    TYPES.OrderRepository
  );

  async buyBook(
    isbnCode: string,
    buyBookCount: number,
    buyDate: string,
    bookStoreId: string
  ) {
    const transaction = Transaction.new(isbnCode, buyBookCount, buyDate);
    this.transactionRepository.save(transaction);
    const bookStore = await this.bookStoreRepository.findById(bookStoreId);
    bookStore.recordTransaction(transaction);
    this.bookStoreRepository.save(bookStore);
  }

  async placeOrder(request: OrderPlaceRequest) {
    const order = Order.new(
      request.isbnCode,
      request.orderBookCount,
      request.userId
    );
    const bookStore = await this.bookStoreRepository.findById(
      request.bookStoreId
    );
    bookStore.recordOrder(order);
    await this.bookStoreRepository.save(bookStore);
  }
}
