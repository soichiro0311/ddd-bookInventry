import type { Meta, StoryObj } from "@storybook/react";
import Home from "@/app/page";
import { delay, http, HttpResponse } from "msw";
import { userEvent, within, expect } from "@storybook/test";
import { KeywordSearchProvider } from "@/app/provider/keywordSearchProvider";
import { mutate } from "swr";

const meta = {
  title: "Home",
  component: Home,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    invalidateSWRCache: true,
  },
  decorators: [
    (Story) => {
      mutate(() => true, undefined, { revalidate: true });
      return <Story />;
    },
  ],
  args: {},
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchResult: Story = {
  render: () => (
    <KeywordSearchProvider>
      <Home />
    </KeywordSearchProvider>
  ),
};

SearchResult.parameters = {
  msw: {
    handlers: [
      http.get("http://localhost:8080/book", ({ request, params, cookies }) => {
        return HttpResponse.json([
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
        ]);
      }),
    ],
  },
};

export const SearchEmptyResult: Story = {
  render: () => (
    <KeywordSearchProvider>
      <Home />
    </KeywordSearchProvider>
  ),
};
SearchEmptyResult.parameters = {
  msw: {
    handlers: [
      http.get("http://localhost:8080/book", ({ request, params, cookies }) => {
        return HttpResponse.json([]);
      }),
    ],
  },
};

export const Loading: Story = {
  render: () => (
    <KeywordSearchProvider>
      <Home />
    </KeywordSearchProvider>
  ),
  parameters: {
    msw: {
      handlers: [
        http.get("http://localhost:8080/book", async () => {
          await delay("infinite");
        }),
      ],
    },
  },
};

export const ClickSearch: Story = {
  render: () => (
    <KeywordSearchProvider>
      <Home />
    </KeywordSearchProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 👇 Simulate interactions with the component
    await userEvent.type(canvas.getByPlaceholderText("タイトル"), "ガイド");
    await userEvent.click(canvas.getByLabelText("search"));

    // 👇 Assert DOM structure
    await expect(canvas.getByText("世界旅行ガイド")).toBeInTheDocument();
    await expect(canvas.queryByText("国語辞典")).not.toBeInTheDocument();
    await expect(canvas.queryByText("Linux入門")).not.toBeInTheDocument();
    await expect(canvas.queryByText("typescript大全")).not.toBeInTheDocument();
  },
};
ClickSearch.parameters = {
  msw: {
    handlers: [
      http.get("http://localhost:8080/book", ({ request, params, cookies }) => {
        const url = new URL(request.url);
        const title = url.searchParams.get("title");
        if (title === "ガイド") {
          return HttpResponse.json([
            {
              title: "世界旅行ガイド",
              price: 1200,
              isbnCode: "ISBN1234567890126",
            },
          ]);
        }
        return HttpResponse.json([
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
        ]);
      }),
    ],
  },
};
