At the moment this is just a playground for learning web components.


```js
// A template tag itself is not even considered to be in the document, until it's activated.
const template = document.createElement("template");

template.innerHTML = `
  <style>
    ${/* matches the shadow host of the shadow dom */}
    :host {}
    ${/* matches any element placed in <slot> */}
    ::slotted(*) {}
  </style>
  <span data-component="my-element" data-test="instance-id"><slot></slot></span>
`;

class MyElement extends HTMLElement {
    // Run whenever an element is created, but before the element is attached to the  document.
    // set initial state, event listeners, and creating the shadow DOM.
    constructor() {
        super();
        // Elements of the shadow root are accessible from JavaScript outside the root
        const mode = "open";
        // Attaches a shadow DOM tree to the specified element and returns ShadowRoot ref
        const root = this.attachShadow({ mode: "open" });
        // Add template to shadowroot
        root.appendChild(template.content.cloneNode(true));
        console.log('constructed!');
    }

    // The connectedCallback is called when the element is inserted to the DOM.
    // fetch data or set default attributes.
    connectedCallback() {
        console.log('connected!');
    }

    // The disconnectedCallback is called whenever the element is removed from the DOM.
    // Remove any event listeners or cancel intervals.
    disconnectedCallback() {
        console.log('disconnected!');
    }

    // The attributeChangedCallback is called any time your element's observed attributes change
    attributeChangedCallback(name, oldVal, newVal) {
        console.log(`Attribute: ${name} changed!`);
    }

    // We can observe an element's attributes by implementing a static observedAttributes getter
    static get observedAttributes() {
        return ['my-attr'];
    }

    // The adoptedCallback is called each time the custom element is moved to a new document.
    // You'll only run into this use case when you have <iframe> elements in your page.
    adoptedCallback() {
        console.log('adopted!');
    }
}

// Register our element to the CustomElementRegistry
window.customElements.define('my-element', MyElement);
```