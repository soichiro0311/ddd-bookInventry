import supertest from "supertest";
import { server } from "../../route";
import { BookStoreDto } from "../../presentation/dto/BookStoreDto";

describe("書店登録ユースケース", () => {
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
// describe("登録済みの在庫確認ユースケース", () => {
//   it("書店に登録されている在庫を確認できること", async () => {
//     const request = supertest(server);
//     const createResponse = await request.post("/book").send({
//       bookStoreName: "ヨシロー書店",
//       prefecture: "Tokyo",
//       city: "Chuou",
//       streetNumber: 3,
//       blockNumber: 2,
//     });

//     expect(createResponse.status).toBe(200);

//     const allBookStore = (await request.get("/bookStore"))
//       .body as BookStoreDto[];
//     expect(allBookStore).toHaveLength(1);
//     expect(allBookStore[0].bookStoreName).toBe("ヨシロー書店");
//     expect(allBookStore[0].address).toBe("Tokyo Chuou 3 2");
//   });
// });
