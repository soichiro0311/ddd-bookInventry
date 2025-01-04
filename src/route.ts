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
