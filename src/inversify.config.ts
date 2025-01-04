import { Container } from "inversify";
import { BookStoreRepository } from "./domain/interface/BookStoreRepository";
import { TYPES } from "./types";
import { BookStoreRepositoryMock } from "./infrastracture/__tests__/BookStoreRepositoryMock";
import { BookStoreRepositoryImpl } from "./infrastracture/BookStoreRepositoryImpl";
import { TransactionRepository } from "./domain/interface/TransactionRepository";
import { TransactionRepositoryMock } from "./infrastracture/__tests__/TransactionRepositoryMock";
import { TransactionRepositoryImpl } from "./infrastracture/TransactionRepositoryImpl";
import { OrderRepository } from "./domain/interface/OrderRepository";
import { OrderRepositoryMock } from "./infrastracture/__tests__/OrderRepositoryMock";
import { OrderRepositoryImpl } from "./infrastracture/OrderRepositoryImpl";
import { BookRepository } from "./domain/interface/BookRepository";
import { BookRepositoryMock } from "./infrastracture/__tests__/BookRepositoryMock";
import { BookRepositoryImpl } from "./infrastracture/BookRepositoryImpl";

const myContainer = new Container();

myContainer
  .bind<BookStoreRepository>(TYPES.BookStoreRepository)
  .to(
    process.env.NODE_ENV === "test"
      ? BookStoreRepositoryMock
      : BookStoreRepositoryImpl
  )
  .inSingletonScope();
myContainer
  .bind<TransactionRepository>(TYPES.TransactionRepository)
  .to(
    process.env.NODE_ENV === "test"
      ? TransactionRepositoryMock
      : TransactionRepositoryImpl
  )
  .inSingletonScope();
myContainer
  .bind<OrderRepository>(TYPES.OrderRepository)
  .to(
    process.env.NODE_ENV === "test" ? OrderRepositoryMock : OrderRepositoryImpl
  )
  .inSingletonScope();
myContainer
  .bind<BookRepository>(TYPES.BookRepository)
  .to(process.env.NODE_ENV === "test" ? BookRepositoryMock : BookRepositoryImpl)
  .inSingletonScope();

export { myContainer };
