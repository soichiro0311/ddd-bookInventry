import { SearchBook } from "../usecase/SearchBook";
import { BookDto } from "./dto/BookDto";

const searchBook = new SearchBook();

export class BookController {
  searchBook(req: any, res: any) {
    searchBook.search(req.query.title).then((targetBooks) => {
      const dto = targetBooks.map((domain: any) =>
        BookDto.fromDomainModel(domain)
      );
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      res.status(200).send(dto);
    });
  }
}
