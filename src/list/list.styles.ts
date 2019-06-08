import { name } from "./list.name";

export const getStyles = () => {
  return `[data-component="${name}"] {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
:host([direction="vertical"]) [data-component="${name}"] {
  flex-direction: column;
  flex-wrap: no-wrap;
}
:host([center="true"]) [data-component="${name}"] {
  align-items: center;
}
:host([justify="space-between"]) [data-component="${name}"] {
  justify-content: space-between;
}
:host([stretch="stretch"]) [data-component="${name}"] {
  flex-grow: 1;
}
::slotted(*) {
  margin: 8px;
  background: var(--background);
}
`;
};
