import PropTypes from "prop-types";
import { createComponent } from "../create-component";
import { name } from "./list.name";
import { getStyles } from "./list.styles";

const propTypes = {
  /**
   * Blah
   */
  props: PropTypes.any
};

const defaultProps = {
  props: {}
};

const template = document.createElement("template");
template.innerHTML = `
  <style>
    ${getStyles()}
  </style>
  <span data-component="${name}" data-test="1"></span>
`;

const Component = createComponent({
  propTypes,
  defaultProps,
  displayName: name
});

class List extends Component {
  state;
  static propTypes;
  static defaultProps;
  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.appendChild(template.content.cloneNode(true));
    const element = root.querySelector(this.selector);
    this.state = {
      element,
      propTypes
    };
  }

  connectedCallback() {
    const props = JSON.parse(this.getAttribute("props"));
    this.drawTable(props);
  }

  drawTable(props) {
    const table = document.createElement("div");
    table.style.width = "100%";
    Object.keys(props).forEach((prop, index) => {
      const row = document.createElement("div");
      row.style.display = "flex";
      row.style.flexDirection = "row";
      row.style.flexWrap = "wrap";
      row.style.width = "100%";
      row.style.background = index % 2 === 0 ? "white" : "grey";

      const title = document.createElement("div");
      title.style.display = "flex";
      title.style.flexDirection = "column";
      title.style.flexBasis = "100%";
      title.style.flex = "1";
      title.innerHTML = prop;

      const type = document.createElement("div");
      type.style.display = "flex";
      type.style.flexDirection = "column";
      type.style.flexBasis = "100%";
      type.style.flex = "1";
      type.innerHTML = props[prop].type + "";

      const required = document.createElement("div");
      required.style.display = "flex";
      required.style.flexDirection = "column";
      required.style.flexBasis = "100%";
      required.style.flex = "1";
      required.innerHTML = props[prop].required + "";

      row.appendChild(title);
      row.appendChild(type);
      row.appendChild(required);

      table.appendChild(row);
    });
    this.state.element.appendChild(table);
  }
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

customElements.define(name, List);

export default List;
