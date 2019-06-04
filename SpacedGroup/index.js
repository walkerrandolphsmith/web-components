const template = document.createElement("template");
template.innerHTML = `
  <style>
    span {
      background: green;
    }
    ::slotted(*) {
      margin: 8px;
      background: red;
    }
  </style>
  <span><slot></slot></span>
`;

customElements.define(
  "spaced-group",
  class SpacedGroup extends HTMLElement {
    $(selector) {
      return this.shadowRoot && this.shadowRoot.querySelector(selector);
    }

    constructor() {
      super();
      const root = this.attachShadow({ mode: "open" });
      root.appendChild(template.content.cloneNode(true));
    }
  }
);
