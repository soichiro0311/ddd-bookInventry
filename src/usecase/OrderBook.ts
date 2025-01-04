import { BookStore } from "../domain/BookStore";
import { BookStoreRepository } from "../domain/interface/BookStoreRepository";
import { Order } from "../domain/Order";
import { Transaction } from "../domain/Transaction";
import { TransactionRepository } from "../domain/interface/TransactionRepository";
import { myContainer } from "../inversify.config";
import { TYPES } from "../types";
import { OrderRepository } from "../domain/interface/OrderRepository";

export class OrderBook {
  private bookStoreRepository =
    myContainer.get<BookStoreRepository>(
      TYPES.BookStoreRepository
    );
  private transactionRepository =
    myContainer.get<TransactionRepository>(
      TYPES.TransactionRepository
    );
  private orderRepository =
    myContainer.get<OrderRepository>(TYPES.OrderRepository);

  async buyBook(
    isbnCode: string,
    buyBookCount: number,
    buyDate: string,
    bookStoreId: string
  ) {
    const transaction = Transaction.new(
      isbnCode,
      buyBookCount,
      buyDate
    );
    this.transactionRepository.save(transaction);
    const bookStore =
      await this.bookStoreRepository.findById(bookStoreId);
    bookStore.recordTransaction(transaction);
    this.bookStoreRepository.save(bookStore);
  }

  async placeOrder(
    isbnCode: string,
    orderBookCount: number,
    bookStoreId: string
  ) {
    const order = Order.new(isbnCode, orderBookCount);
    this.orderRepository.save(order);
    const bookStore =
      await this.bookStoreRepository.findById(bookStoreId);
    bookStore.recordOrder(order);
    this.bookStoreRepository.save(bookStore);
  }
}
