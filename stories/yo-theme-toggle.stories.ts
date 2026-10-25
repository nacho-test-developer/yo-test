import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/yo-theme-toggle/yo-theme-toggle.ts";

const meta = {
  title: "Components/yo-theme-toggle",
  component: "yo-theme-toggle",
  tags: ["autodocs"],
  render: () => html`<yo-theme-toggle></yo-theme-toggle>`,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};
