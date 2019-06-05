import { name } from './spaced-group.name';
import { getStyles } from './spaced-group.styles';

const template = document.createElement("template");
template.innerHTML = `
  <style>
    ${getStyles()}
  </style>
  <span data-component="${name}" data-test="1"><slot></slot></span>
`;

customElements.define(
  name,
  class Component extends HTMLElement {
    $(selector) {
      return this.shadowRoot && this.shadowRoot.querySelector(selector);
    }

    constructor() {
      super();
      const root = this.attachShadow({ mode: "open" });
      root.appendChild(template.content.cloneNode(true));
    }
    connectedCallback() {
      if (!this.hasAttribute('xs')) {
        this.setAttribute('xs', '4');
      }
    }
    get xs() {
      return this.getAttribute('xs');
    }
    set xs(newValue) {
      this.setAttribute('xs', `${newValue}`);
    }
    get sm() {
      return this.getAttribute('sm');
    }
    set sm(newValue) {
      this.setAttribute('sm', `${newValue}`);
    }
  }
);