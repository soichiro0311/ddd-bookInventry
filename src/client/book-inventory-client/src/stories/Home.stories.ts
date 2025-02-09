import type { Meta, StoryObj } from "@storybook/react";
import Home from "@/app/page";
import { delay, http, HttpResponse } from "msw";
import { within } from "@storybook/test";

const meta = {
  title: "Home",
  component: Home,
  tags: ["autodocs"],
  parameters: {},
  args: {},
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchResult: Story = {};
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

export const SearchEmptyResult: Story = {};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("http://localhost:8080/book", async () => {
          await delay("infinite");
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
