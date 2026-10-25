import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/yo-image/yo-image.ts";

const meta = {
  title: "Components/yo-image",
  component: "yo-image",
  tags: ["autodocs"],
  argTypes: {
    alt: { control: "text" },
  },
  args: {
    alt: "My image",
  },
  render: (args) => html`<yo-image alt=${args.alt}></yo-image>`,
} satisfies Meta<{ alt: string }>;

export default meta;
type Story = StoryObj<{ alt: string }>;

export const Default: Story = {};

export const CustomAlt: Story = {
  args: { alt: "Foto de ejemplo" },
};
