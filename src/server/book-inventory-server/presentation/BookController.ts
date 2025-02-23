import { SearchBook } from "../usecase/SearchBook";
import { BookDto } from "./dto/BookDto";

const searchBook = new SearchBook();

const searchByTitle = (req: any, res: any) => {
  searchBook.searchByTitle(req.query.title).then((targetBooks) => {
    const dto = targetBooks.map((domain: any) =>
      BookDto.fromDomainModel(domain)
    );
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.status(200).send(dto);
  });
};

const searchByIsbnCode = (req: any, res: any) => {
  searchBook.searchByIsbnCode(req.query.isbnCode).then((targetBook) => {
    const dto = BookDto.fromDomainModel(targetBook);
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.status(200).send(dto);
  });
};

export class BookController {
  search(req: any, res: any) {
    if (req.query.title != null) {
      searchByTitle(req, res);
    } else if (req.query.isbnCode != null) {
      searchByIsbnCode(req, res);
    } else {
      searchByTitle(req, res);
    }
  }
}
