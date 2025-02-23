import express from "express";

import { BookController } from "./presentation/BookController";
import { BookStoreController } from "./presentation/BookStoreController";
import { OrderController } from "./presentation/OrderController";

export const server = express();

server.use(express.json());
server.use(
  express.urlencoded({
    extended: true,
  })
);

const bookController = new BookController();
const bookStoreController = new BookStoreController();
const orderController = new OrderController();

server.post("/bookStore", bookStoreController.addBookStore);
server.get("/bookStore", bookStoreController.allBookStore);

server.post("/book", bookStoreController.fetchBook);
server.get("/book", bookController.search);

server.post("/bookInventory", bookStoreController.fetchBookInventry);
server.get("/bookInventory", bookStoreController.searchBookInventory);

server.post("/order", orderController.order);
