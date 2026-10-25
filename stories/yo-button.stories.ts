import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/yo-button/yo-button.ts";

const meta = {
  title: "Components/yo-button",
  component: "yo-button",
  tags: ["autodocs"],
  argTypes: {
    count: { control: "number" },
  },
  args: {
    count: 0,
  },
  render: (args) => html`
    <yo-button .count=${args.count}>
      <span slot="prefix">★</span>
      Click me
      <span slot="suffix">pedro</span>
    </yo-button>
  `,
} satisfies Meta<{ count: number }>;

export default meta;
type Story = StoryObj<{ count: number }>;

export const Default: Story = {};

export const WithInitialCount: Story = {
  args: { count: 5 },
};

export const Empty: Story = {
  render: () => html`<yo-button>Botón</yo-button>`,
};
