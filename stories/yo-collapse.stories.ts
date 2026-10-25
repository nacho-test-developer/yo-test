import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/yo-collapse/yo-collapse.ts";
import "../src/components/yo-button/yo-button.ts";

const meta = {
  title: "Components/yo-collapse",
  component: "yo-collapse",
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean" },
    summary: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    open: false,
    summary: "Click to expand",
    disabled: false,
  },
  render: (args) => html`
    <yo-collapse ?open=${args.open} summary=${args.summary} ?disabled=${args.disabled}>
      <p>Contenido oculto que se revela al abrir.</p>
      <yo-button ui="full">Acción</yo-button>
    </yo-collapse>
  `,
} satisfies Meta<{ open: boolean; summary: string; disabled: boolean }>;

export default meta;
type Story = StoryObj<{ open: boolean; summary: string; disabled: boolean }>;

export const Closed: Story = {};

export const Open: Story = {
  args: { open: true },
};

export const Disabled: Story = {
  args: { disabled: true, summary: "Disabled collapse" },
};

export const WithSummarySlot: Story = {
  render: () => html`
    <yo-collapse>
      <span slot="summary">Encabezado personalizado</span>
      <p>Contenido.</p>
    </yo-collapse>
  `,
};
