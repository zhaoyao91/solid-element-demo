import { customElement } from 'solid-element';
import { App } from './App';

customElement('my-app', { myName: 'AAA' }, (props, { element }) => {
  return (
    <div>
      <p>hello {props.myName}</p>
      <App />
    </div>
  );
});
