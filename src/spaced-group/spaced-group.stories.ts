import { html } from "lit-element";
import { storiesOf } from "@storybook/polymer";
import { withKnobs, color } from "@storybook/addon-knobs/polymer";
import { name } from './spaced-group.name';
import "../spaced-group";

const defaultView = html`
  <style>
    spaced-group {
      --background: ${color("Some color", "blue")};
    }
  </style>
  <spaced-group xs="4" sm="8">
    <div style="width: 25px; height: 25px;"></div>
    <div style="width: 25px; height: 25px;"></div>
    <div style="width: 25px; height: 25px;"></div>
    <div style="width: 25px; height: 25px;"></div>
  </spaced-group>
  <p>
  SpacedGroups are great when you have variable width elements you want to uniformly space and wrap to the next line.
  </p>
`;

storiesOf(name, module)
  .addDecorator(withKnobs)
  .add("default view", () => defaultView);
