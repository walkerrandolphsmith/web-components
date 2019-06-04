import { LitElement, css, html, property, customElement } from "lit-element";

@customElement("spaced-group")
export class SpacedGroup extends LitElement {
  @property() dataTest = "-1";

  static styles = css`
    span {
      background: green;
    }
    ::slotted(*) {
      margin: 8px;
      background: red;
    }
  `;

  render() {
    return html`
      <span data-component="spaced-group" data-test="${this.dataTest}"
        ><slot></slot
      ></span>
    `;
  }
}
