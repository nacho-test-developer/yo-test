import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/yo-card/yo-card.ts";
import "../src/components/yo-image/yo-image.ts";
import "../src/components/yo-button/yo-button.ts";

const meta = {
  title: "Components/yo-card",
  component: "yo-card",
  tags: ["autodocs"],
  render: () => html`
    <yo-card>
      <yo-image slot="image"></yo-image>
      <p>Contenido de la tarjeta</p>
      <yo-button slot="actions" ui="full">Acción</yo-button>
    </yo-card>
  `,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Multiple: Story = {
  render: () => html`
    <div style="display:grid;gap:1rem;grid-template-columns:repeat(3,1fr)">
      <yo-card>
        <yo-image slot="image"></yo-image>
        <p>Primera tarjeta</p>
      </yo-card>
      <yo-card>
        <yo-image slot="image"></yo-image>
        <p>Segunda tarjeta</p>
        <yo-button slot="actions" ui="full">Chau</yo-button>
      </yo-card>
      <yo-card>
        <p>Sin imagen</p>
      </yo-card>
    </div>
  `,
};
