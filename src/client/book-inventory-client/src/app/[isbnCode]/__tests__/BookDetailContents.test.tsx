import { render, waitFor, screen } from "@testing-library/react";
import { delay, http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { SWRConfig } from "swr";
import BookDetailContents from "../ContentsArea";
import * as navigation from "next/navigation";
import {
  KeywordSearchProvider,
  useKeywordSearchContext,
} from "../../provider/keywordSearchProvider";
import userEvent from "@testing-library/user-event";

const TEST_TITLE = "テスト書籍";

jest.mock("next/navigation");

describe("UI Stack", () => {
  function TestComponent() {
    return (
      <SWRConfig value={{ provider: () => new Map() }}>
        <KeywordSearchProvider>
          <>
            <BookDetailContents isbnCode={"1234567890"} />
          </>
        </KeywordSearchProvider>
      </SWRConfig>
    );
  }
  (navigation.useRouter as jest.Mock).mockImplementation(() => ({
    push: jest.fn(),
  }));
  const server = setupServer(/* TODO: デフォルトのハンドラーを追加 */);
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  test("読み込み中のUI", async () => {
    server.use(
      http.get("http://localhost:8080/bookInventory", async () => {
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
      http.get("http://localhost:8080/bookInventory", async () => {
        return HttpResponse.json(bookInventoryInfo);
      })
    );
    render(<TestComponent />);
    await waitFor(() => {
      expect(screen.queryByText("読み込み中")).not.toBeInTheDocument();
      expect(screen.getByText("世界一優しい技術書")).toBeInTheDocument();
      expect(screen.getByText("大中小書店")).toBeInTheDocument();
      expect(screen.queryAllByText("在庫あり")).toHaveLength(2);
      expect(screen.queryAllByText("在庫なし")).toHaveLength(1);
    });
  });
  test("書籍データが一件も存在しない場合のUI", async () => {
    server.use(
      http.get("http://localhost:8080/bookInventory", async () => {
        return HttpResponse.json(bookInventoryInfoWithNoInventory);
      })
    );
    render(<TestComponent />);
    await waitFor(() => {
      expect(screen.queryByText("読み込み中")).not.toBeInTheDocument();
      expect(
        screen.getByText(
          "現在はオフライン店舗での取り扱いはございません。オンラインでのお取り扱い店舗をお探しください。"
        )
      ).toBeInTheDocument();
    });
  });
  test("エラーが発生した場合のUI", async () => {
    server.use(
      http.get("http://localhost:8080/bookInventory", async () => {
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

describe("画面遷移時の振る舞い", () => {
  function TestComponent() {
    return (
      <SWRConfig value={{ provider: () => new Map() }}>
        <KeywordSearchProvider>
          <>
            <BookDetailContents isbnCode={"1234567890"} />
            <AssertComponent />
          </>
        </KeywordSearchProvider>
      </SWRConfig>
    );
  }

  function AssertComponent() {
    const { keyword } = useKeywordSearchContext();
    return <p>{keyword}</p>;
  }
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

  test("在庫管理ページでキーワード検索をしすると、ホームに戻り、キーワード検索が実施されていること", async () => {
    server.use(
      http.get("http://localhost:8080/bookInventory", async () => {
        return HttpResponse.json(bookInventoryInfo);
      })
    );
    server.use(
      http.get("http://localhost:8080/book", async ({ request }) => {
        const url = new URL(request.url);

        const title = url.searchParams.get("title");
        if (title === TEST_TITLE) {
          return HttpResponse.json(testTitleHitContents);
        }
      })
    );
    render(<TestComponent />);
    const searchForm = screen.getByPlaceholderText("タイトル");
    await userEvent.type(searchForm, TEST_TITLE);
    const searchFormSendButton = screen.getByRole("button", { name: "search" });
    await userEvent.click(searchFormSendButton);

    await waitFor(() =>
      expect(screen.queryByText(TEST_TITLE)).toBeInTheDocument()
    );
  });
});

const bookInventoryInfo = {
  bookInfo: {
    title: "世界一優しい技術書",
    price: 1500,
    isbnCode: "ISBN1234567890123",
  },
  inventoryInfo: [
    {
      bookStoreId: "5f09ca93-fa8f-44fb-8651-4b027cd6ba77",
      bookStoreName: "大中小書店",
      address: "Tokyo Shibuya 5 12",
      inStoreInventory: 0,
    },
    {
      bookStoreId: "bdb25023-ead1-4a7a-95e9-b3bb650a02bb",
      bookStoreName: "ヨシロー書店",
      address: "Tokyo Chuou 3 2",
      inStoreInventory: 50,
    },
    {
      bookStoreId: "ea6125bd-c2ed-476f-9d2f-c38672c4beb2",
      bookStoreName: "角善",
      address: "Kanagawa Kawasaki 12 1",
      inStoreInventory: 50,
    },
  ],
};

const bookInventoryInfoWithNoInventory = {
  bookInfo: {
    title: "世界一優しい技術書",
    price: 1500,
    isbnCode: "ISBN1234567890123",
  },
  inventoryInfo: [],
};

const testTitleHitContents = [
  {
    title: "テスト書籍ガイド",
    price: 1200,
    isbnCode: "TESTTEST",
  },
];
