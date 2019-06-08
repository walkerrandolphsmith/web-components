import PropTypes from "prop-types";
import { createComponent } from "../create-component";
import { name } from "./spaced-group.name";
import { getStyles } from "./spaced-group.styles";

const spacingUnits = [0, 2, 4, 8, 16, 24, 32, 40];

const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

const propTypes = {
  /**
   * Set components to equally space.
   */
  children: PropTypes.node,
  /**
   * Set the direction elements should be rendered.
   */
  direction: PropTypes.oneOf([VERTICAL, HORIZONTAL]),
  /*
   * Turn on vertical or horizontal centering of items
   */
  center: PropTypes.bool,
  /**
   * If true stretch to fill space
   */
  stretch: PropTypes.bool,
  /**
   * Set the amount to space to apply between elements when the screen is phone and up
   */
  xs: PropTypes.oneOf(spacingUnits),
  /**
   * Set the amount to space to apply between elements when the screen is tablet portrait and up
   */
  sm: PropTypes.oneOf(spacingUnits),
  /**
   * Set the amount to space to apply between elements when the screen is tablet landscape and up
   */
  md: PropTypes.oneOf(spacingUnits),
  /**
   * Set the amount to space to apply between elements when the screen is small desktop and up
   */
  lg: PropTypes.oneOf(spacingUnits),
  /**
   * Set the amount to space to apply between elements when the screen is large desktop and up
   */
  xl: PropTypes.oneOf(spacingUnits),
  /**
   * Removes the margin from the frist and last child
   */
  disableGutter: PropTypes.bool,
  /**
   * The underlying DOM element
   */
  is: PropTypes.oneOf(["div", "label"])
};

const defaultProps = {
  direction: HORIZONTAL,
  xs: 8,
  center: false,
  stretch: false,
  disableGutter: false,
  is: "div"
};

const template = document.createElement("template");
template.innerHTML = `
  <style>
    ${getStyles()}
  </style>
  <span data-component="${name}" data-test="1"><slot></slot></span>
`;

const Component = createComponent({
  propTypes,
  defaultProps,
  displayName: name
});

class SpacedGroup extends Component {
  state;
  static propTypes;
  static defaultProps;
  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.appendChild(template.content.cloneNode(true));
    const element = root.querySelector(this.selector);
    this.state = {
      element
    };
  }

  connectedCallback() {
    const value = this.getAttribute("direction");

    this.applyClass(value);
  }

  applyClass(value) {
    const classToRemove = value === HORIZONTAL ? VERTICAL : HORIZONTAL;
    this.state.element.classList.remove(classToRemove);
    this.state.element.classList.add(value);
  }

  onDirectionChanged(_, newVal) {
    this.applyClass(newVal);
  }
}

SpacedGroup.propTypes = propTypes;
SpacedGroup.defaultProps = defaultProps;

customElements.define(name, SpacedGroup);

export default SpacedGroup;
