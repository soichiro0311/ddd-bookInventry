import { SearchBookInventoryRepository } from "../infrastracture/queryService/SearchBookInventoryRepository";
import { AddBookStoreRequest } from "../usecase/dto/request/AddBookStoreRequest";
import { MaintenanceBookStore } from "../usecase/MaintenanceBookStore";
import { BookStoreDto } from "./dto/BookStoreDto";

const maintenaceBookStore = new MaintenanceBookStore();
const searchBookInventoryQueryService = new SearchBookInventoryRepository();

export class BookStoreController {
  addBookStore(req: any, res: any) {
    const requestDto = new AddBookStoreRequest(
      req.body.bookStoreName,
      req.body.prefecture,
      req.body.city,
      req.body.streetNumber,
      req.body.blockNumber
    );
    maintenaceBookStore.addBookStore(requestDto).then(res.status(200).end());
  }

  allBookStore(req: any, res: any) {
    maintenaceBookStore.allBooks().then((allBooks) => {
      const dto = allBooks.map((domain) =>
        BookStoreDto.fromDomainModel(domain)
      );
      res.status(200).send(dto);
    });
  }

  searchBookInventory(req: any, res: any) {
    searchBookInventoryQueryService
      .findInventoryBy(req.query.isbnCode)
      .then((bookInventory) => {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.status(200).send(bookInventory);
      });
  }

  fetchBookInventry(req: any, res: any) {
    maintenaceBookStore.fetchBookInventry().then(() => {
      res.status(200).end();
    });
  }

  fetchBook(req: any, res: any) {
    maintenaceBookStore.fetchBook().then(() => {
      res.status(200).end();
    });
  }
}
