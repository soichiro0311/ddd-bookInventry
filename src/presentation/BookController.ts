import { AddBookStoreRequest } from "../usecase/dto/request/AddBookStoreRequest";
import { MaintenanceBookStore } from "../usecase/MaintenanceBookStore";
import { BookStoreDto } from "./dto/BookStoreDto";

const maintenaceBookStore = new MaintenanceBookStore();

export class BookController {
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
