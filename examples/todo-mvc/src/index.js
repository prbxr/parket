import 'todomvc-app-css/index.css';
import devtools from 'parket/devtools';

import { TodoStore } from './store';
import { App } from './components/app';

const localStorageKey = 'parket-todomvc-example';
const initialState = localStorage.getItem(localStorageKey)
  ? JSON.parse(localStorage.getItem(localStorageKey))
  : {
      todos: [
        {
          text: 'learn Mobx',
          completed: false,
          id: 0,
          __p_model: 'Todo',
        },
        {
          text: 'learn MST',
          completed: false,
          id: 1,
          __p_model: 'Todo',
        },
      ],
    };

const store = TodoStore(initialState);

devtools(store);

store.onSnapshot((snapshot) => {
  localStorage.setItem(localStorageKey, JSON.stringify(snapshot));
});

store.onAction(console.log.bind(console, 'action'));
store.onPatch(console.log.bind(console, 'patch'));
store.onSnapshot(console.log.bind(console, 'snapshot'));

global.store = store;

export default () => <App store={store} />;
