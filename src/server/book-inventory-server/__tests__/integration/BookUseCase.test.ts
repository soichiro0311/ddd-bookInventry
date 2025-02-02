import supertest from "supertest";
import { BookRepository } from "../../domain/interface/BookRepository";
import { BookStoreRepository } from "../../domain/interface/BookStoreRepository";
import { myContainer } from "../../inversify.config";
import { TYPES } from "../../types";
import { server } from "../../route";

describe("書籍検索ユースケース", () => {
  beforeEach(() => {
    myContainer.get<BookStoreRepository>(TYPES.BookStoreRepository).clear();
    myContainer.get<BookRepository>(TYPES.BookRepository).clear();
  });
  it("書籍をタイトルで全文一致で検索する", async () => {
    const request = supertest(server);
    await request.post("/book");

    const books = await request.get("/book").send({
      title: "バイク雑誌",
    });

    expect(books.status).toBe(200);
    expect(books.body).toHaveLength(1);
    expect(books.body[0].isbnCode).toBe("ISBN1234567890111");
    expect(books.body[0].title).toBe("バイク雑誌");
  });
  it("書籍をタイトルで部分一致で検索する", async () => {
    const request = supertest(server);
    await request.post("/book");

    const books = await request.get("/book").send({
      title: "バイク",
    });

    expect(books.status).toBe(200);
    expect(books.body).toHaveLength(1);
    expect(books.body[0].isbnCode).toBe("ISBN1234567890111");
    expect(books.body[0].title).toBe("バイク雑誌");
  });
});
