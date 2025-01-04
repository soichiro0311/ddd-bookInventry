import express from "express";

import { BookController } from "./presentation/BookController";

export const server = express();

server.use(express.json());
server.use(
  express.urlencoded({
    extended: true,
  })
);

const bookStoreController = new BookController();
server.post("/bookStore", bookStoreController.addBookStore);
server.get("/bookStore", bookStoreController.allBookStore);

server.post("/book", bookStoreController.fetchBook);
server.post("/bookInventory", bookStoreController.fetchBookInventry);
