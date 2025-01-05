import supertest from "supertest";
import { server } from "../../route";
import { BookStoreDto } from "../../presentation/dto/BookStoreDto";
import { BookStoreRepository } from "../../domain/interface/BookStoreRepository";
import { TYPES } from "../../types";
import { myContainer } from "../../inversify.config";
import { BookRepository } from "../../domain/interface/BookRepository";
import { v4 as uuidv4 } from "../../../node_modules/uuid/dist/cjs";
import { dummyInventoryCSVDto } from "../../infrastracture/__tests__/BookStoreRepositoryMock";
import { BookInventoryRepositoryDto } from "../../usecase/dto/response/BookInventryRepositoryDto";

describe("書店登録ユースケース", () => {
  beforeEach(() => {
    myContainer.get<BookStoreRepository>(TYPES.BookStoreRepository).clear();
    myContainer.get<BookRepository>(TYPES.BookRepository).clear();
  });
  it("書店を登録できること", async () => {
    const request = supertest(server);
    const createResponse = await request.post("/bookStore").send({
      bookStoreName: "ヨシロー書店",
      prefecture: "Tokyo",
      city: "Chuou",
      streetNumber: 3,
      blockNumber: 2,
    });

    expect(createResponse.status).toBe(200);

    const allBookStore = (await request.get("/bookStore"))
      .body as BookStoreDto[];
    expect(allBookStore).toHaveLength(1);
    expect(allBookStore[0].bookStoreName).toBe("ヨシロー書店");
    expect(allBookStore[0].address).toBe("Tokyo Chuou 3 2");
    expect(allBookStore[0].bookInventory).toHaveLength(0);
  });
});
describe("登録済みの在庫確認ユースケース", () => {
  beforeEach(() => {
    myContainer.get<BookStoreRepository>(TYPES.BookStoreRepository).clear();
    myContainer.get<BookRepository>(TYPES.BookRepository).clear();
  });
  it("書店に登録されている在庫を確認できること", async () => {
    const request = supertest(server);

    await request.post("/bookStore").send({
      bookStoreName: "テスト書店1",
      prefecture: "Tokyo",
      city: "Chuou",
      streetNumber: 3,
      blockNumber: 2,
    });
    await request.post("/bookStore").send({
      bookStoreName: "テスト書店2",
      prefecture: "Tokyo",
      city: "Chuou",
      streetNumber: 3,
      blockNumber: 2,
    });
    const allBookStore = (await request.get("/bookStore"))
      .body as BookStoreDto[];

    dummyInventoryCSVDto.push(
      new BookInventoryRepositoryDto(
        allBookStore[0].id,
        "ISBN1234567890111",
        20,
        0
      )
    );
    dummyInventoryCSVDto.push(
      new BookInventoryRepositoryDto(
        allBookStore[1].id,
        "ISBN1234567890111",
        30,
        10
      )
    );
    dummyInventoryCSVDto.push(
      new BookInventoryRepositoryDto(
        allBookStore[1].id,
        "ISBN1234567890112",
        40,
        0
      )
    );

    await request.post("/book");
    await request.post("/bookInventory");

    const result = (await request.get("/bookStore")).body as BookStoreDto[];

    const firstRegisteredStoreInventory = findInventory(
      result,
      allBookStore[0].id
    );
    expect(firstRegisteredStoreInventory).toHaveLength(1);
    expect(
      firstRegisteredStoreInventory.find(
        (inventory) => inventory.isbnCode === "ISBN1234567890111"
      )
    ).toEqual({
      isbnCode: "ISBN1234567890111",
      inStoreInventory: 20,
      reservationInventory: 0,
    });

    const secondRegisteredStoreInventory = findInventory(
      result,
      allBookStore[1].id
    );
    expect(secondRegisteredStoreInventory).toHaveLength(2);
    expect(
      secondRegisteredStoreInventory.find(
        (inventory) => inventory.isbnCode === "ISBN1234567890111"
      )
    ).toEqual({
      isbnCode: "ISBN1234567890111",
      inStoreInventory: 30,
      reservationInventory: 10,
    });
    expect(
      secondRegisteredStoreInventory.find(
        (inventory) => inventory.isbnCode === "ISBN1234567890112"
      )
    ).toEqual({
      isbnCode: "ISBN1234567890112",
      inStoreInventory: 40,
      reservationInventory: 0,
    });
  });
});

const findInventory = (result: BookStoreDto[], targetStoreId: string) => {
  return result.find((store) => store.id === targetStoreId)!.bookInventory;
};
