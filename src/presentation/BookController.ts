import { SearchBookInventoryRepository } from "../infrastracture/queryService/SearchBookInventoryRepository";
import { AddBookStoreRequest } from "../usecase/dto/request/AddBookStoreRequest";
import { MaintenanceBookStore } from "../usecase/MaintenanceBookStore";
import { SearchBook } from "../usecase/SearchBook";
import { BookDto } from "./dto/BookDto";
import { BookStoreDto } from "./dto/BookStoreDto";

const maintenaceBookStore = new MaintenanceBookStore();
const searchBook = new SearchBook();
const searchBookInventoryQueryService = new SearchBookInventoryRepository();

export class BookController {
  searchBook(req: any, res: any) {
    searchBook.search(req.body.title).then((targetBooks) => {
      const dto = targetBooks.map((domain) => BookDto.fromDomainModel(domain));
      res.status(200).send(dto);
    });
  }
}
