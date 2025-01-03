import { Container } from "inversify";
import { BookStoreRepository } from "./domain/BookStoreRepository";
import { TYPES } from "./types";
import { BookStoreRepositoryMock } from "./infrastracture/__tests__/BookStoreRepositoryMock";
import { BookStoreRepositoryImpl } from "./infrastracture/BookStoreRepositoryImpl";
import { TransactionRepository } from "./domain/TransactionRepository";
import { TransactionRepositoryMock } from "./infrastracture/__tests__/TransactionRepositoryMock";
import { TransactionRepositoryImpl } from "./infrastracture/TransactionRepositoryImpl";

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

export { myContainer };
