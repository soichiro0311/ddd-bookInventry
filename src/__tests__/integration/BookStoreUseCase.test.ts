import supertest from "supertest";
import { server } from "../../route";

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
  });
});
