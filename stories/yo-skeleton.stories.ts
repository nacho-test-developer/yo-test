import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/yo-skeleton/yo-skeleton.ts";

const meta = {
  title: "Components/yo-skeleton",
  component: "yo-skeleton",
  tags: ["autodocs"],
  argTypes: {
    type: { control: "select", options: ["rectangle", "circle", "box", "default"] },
    size: { control: "text" },
    show: { control: "boolean" },
  },
  args: {
    type: "rectangle",
    size: "100% 50px",
    show: true,
  },
  render: (args) => html`
    <yo-skeleton type=${args.type} size=${args.size} ?show=${args.show}></yo-skeleton>
  `,
} satisfies Meta<{ type: string; size: string; show: boolean }>;

export default meta;
type Story = StoryObj<{ type: string; size: string; show: boolean }>;

export const Rectangle: Story = {};

export const Circle: Story = {
  args: { type: "circle", size: "80px" },
};

export const Box: Story = {
  args: { type: "box", size: "160px 120px" },
};

export const WithContent: Story = {
  args: { show: false },
  render: (args) => html`
    <yo-skeleton ?show=${args.show} size="100%">
      <p>Contenido real que se muestra cuando show es false.</p>
    </yo-skeleton>
  `,
};
