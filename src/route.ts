import express from "express";

import { BookController } from "./presentation/BookController";
import { OrderController } from "./presentation/OrderController";

export const server = express();

server.use(express.json());
server.use(
  express.urlencoded({
    extended: true,
  })
);

const bookStoreController = new BookController();
const orderController = new OrderController();

server.post("/bookStore", bookStoreController.addBookStore);
server.get("/bookStore", bookStoreController.allBookStore);

server.post("/book", bookStoreController.fetchBook);
server.get("/book", bookStoreController.searchBook);
server.post("/bookInventory", bookStoreController.fetchBookInventry);

server.post("/order", orderController.order);
