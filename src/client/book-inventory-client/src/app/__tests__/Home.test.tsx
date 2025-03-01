import { render, screen, waitFor } from "@testing-library/react";
import Home from "../page";
import { setupServer } from "msw/node";
import { delay, http, HttpResponse } from "msw";
import { mutate, SWRConfig, useSWRConfig } from "swr";
import * as navigation from "next/navigation";
import { KeywordSearchProvider } from "../provider/keywordSearchProvider";

jest.mock("next/navigation");

function TestComponent() {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      <KeywordSearchProvider>
        <Home />
      </KeywordSearchProvider>
    </SWRConfig>
  );
}

describe("UI Stack", () => {
  const server = setupServer(/* TODO: デフォルトのハンドラーを追加 */);
  beforeAll(() => {
    server.listen();
    (navigation.useRouter as jest.Mock).mockImplementation(() => ({
      push: jest.fn(),
    }));
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  test("読み込み中のUI", async () => {
    server.use(
      http.get("http://localhost:8080/book", async () => {
        await delay("infinite");
      })
    );
    render(<TestComponent />);
    await waitFor(() =>
      expect(screen.getByLabelText("読み込み中")).toBeInTheDocument()
    );
  });
  test("書籍データの存在する場合のUI", async () => {
    server.use(
      http.get("http://localhost:8080/book", async () => {
        return HttpResponse.json(multipleBooks);
      })
    );
    render(<TestComponent />);
    await waitFor(() => {
      expect(screen.queryByText("読み込み中")).not.toBeInTheDocument();
      expect(screen.getByText("typescript大全")).toBeInTheDocument();
    });
  });
  test("書籍データが一件も存在しない場合のUI", async () => {
    server.use(
      http.get("http://localhost:8080/book", async () => {
        return HttpResponse.json([]);
      })
    );
    render(<TestComponent />);
    await waitFor(() => {
      expect(screen.queryByText("読み込み中")).not.toBeInTheDocument();
      expect(
        screen.getByText("対象のキーワードに該当する書籍はありませんでした。")
      ).toBeInTheDocument();
    });
  });
  test("エラーが発生した場合のUI", async () => {
    server.use(
      http.get("http://localhost:8080/book", async () => {
        return new HttpResponse(JSON.stringify({}), { status: 500 });
      })
    );
    render(<TestComponent />);
    await waitFor(() => {
      expect(screen.queryByText("読み込み中")).not.toBeInTheDocument();
      expect(
        screen.getByText(
          "一時的にエラーが発生しております。再度時間置いて検索してください。"
        )
      ).toBeInTheDocument();
    });
  });
});

const multipleBooks = [
  {
    title: "世界旅行ガイド",
    price: 1200,
    isbnCode: "ISBN1234567890126",
  },
  {
    title: "国語辞典",
    price: 3000,
    isbnCode: "ISBN1234567890125",
  },
  {
    title: "Linux入門",
    price: 1400,
    isbnCode: "ISBN1234567890128",
  },
  {
    title: "typescript大全",
    price: 3210,
    isbnCode: "ISBN1234567890326",
  },
];
