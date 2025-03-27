import type { Preview } from "@storybook/react";
import { initialize, mswDecorator } from "msw-storybook-addon";
import "../src/app/globals.css";

initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [mswDecorator],
};

export default preview;
