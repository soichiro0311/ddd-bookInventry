import { AddBookStoreRequest } from "../usecase/dto/request/AddBookStoreRequest";
import { MaintenanceBookStore } from "../usecase/MaintenanceBookStore";

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
}
