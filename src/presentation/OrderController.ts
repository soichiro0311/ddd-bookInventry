import { AddBookStoreRequest } from "../usecase/dto/request/AddBookStoreRequest";
import { OrderPlaceRequest } from "../usecase/dto/request/OrderPlaceRequest";

import { MaintenanceBookStore } from "../usecase/MaintenanceBookStore";
import { OrderBook } from "../usecase/OrderBook";
import { BookStoreDto } from "./dto/BookStoreDto";
const orderBook = new OrderBook();
export class OrderController {
  order(req: any, res: any) {
    const requestDto = new OrderPlaceRequest(
      req.body.isbnCode,
      req.body.orderBookCount,
      req.body.bookStoreId,
      req.body.userId
    );
    orderBook.placeOrder(requestDto).then(() => {
      res.status(200).end();
    });
  }
}
