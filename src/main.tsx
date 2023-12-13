import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Application from './App';
import { store } from './store';
import './style/style.scss';

// Application to Render
const app = (
  <Provider store={store}>
    <Application />
  </Provider>
);

// Render application in DOM
createRoot(document.getElementById('root') as HTMLElement).render(app);
