import { propTypesToObject } from "../prop-types-to-object.ts";

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getChangeHandlerName(method) {
  return "on" + capitalize(method) + "Change";
}

export function createComponent({ propTypes, defaultProps, displayName }): any {
  const propNames = Object.keys(propTypes);

  var CustomElement = function(): HTMLElement {
    return Reflect.construct(HTMLElement, [], CustomElement);
  };
  CustomElement.prototype = Object.create(HTMLElement.prototype);
  // CustomElement.prototype.buildDoc = function(React): any {
  //   class Document extends React.Component {
  //     render() {
  //       return this.props.children;
  //     }
  //   }
  //   Document.propTypes = propTypes;
  //   Document.defaultProps = defaultProps;
  //   return Document;
  // };
  CustomElement.prototype.propDefinitions = JSON.stringify(
    propTypesToObject(propTypes)
  );
  CustomElement.prototype.selector = `[data-component=${displayName}]`;
  CustomElement.prototype.observedAttributes = Object.keys(propTypes);
  CustomElement.prototype.attributeChangedCallback = function(
    attribute,
    oldVal,
    newVal
  ) {
    this.handlersByProp[attribute](oldVal, newVal);
  };
  CustomElement.prototype.handlersByProp = propNames.reduce(
    (handlersByProp, propName) => {
      CustomElement.prototype[getChangeHandlerName(propName)] = function() {};
      return Object.assign({}, handlersByProp, {
        [propName]: CustomElement.prototype[getChangeHandlerName(propName)]
      });
    },
    {}
  );
  propNames.forEach(propName => {
    Object.defineProperty(CustomElement.prototype, propName, {
      writable: true,
      value: defaultProps[propName]
    });
  });

  class CustomElementE extends HTMLElement {}

  CustomElement.prototype.constructor = CustomElement;
  CustomElementE.prototype = CustomElement.prototype;

  return CustomElementE;
}
