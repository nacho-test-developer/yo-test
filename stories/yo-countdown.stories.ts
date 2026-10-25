import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/yo-countdown/yo-countdown.ts";

const meta = {
  title: "Components/yo-countdown",
  component: "yo-countdown",
  tags: ["autodocs"],
  argTypes: {
    date: { control: "text" },
  },
  args: {
    date: "31/12/2026",
  },
  render: (args) => html`<yo-countdown date=${args.date}></yo-countdown>`,
} satisfies Meta<{ date: string }>;

export default meta;
type Story = StoryObj<{ date: string }>;

export const Default: Story = {};

export const NearDate: Story = {
  args: { date: "12/06/2026" },
};

export const Expired: Story = {
  args: { date: "01/01/2020" },
};
