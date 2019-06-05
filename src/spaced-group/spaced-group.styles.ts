import { name } from './spaced-group.name';

export const getStyles = () => {
  return `[data-component="${name}"] {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: red;
}
::slotted(*) {
  margin: 8px;
  background: var(--background);
}
`};