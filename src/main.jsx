import { createRoot } from 'react-dom/client';
import { store } from './store';
import WeatherApp from './WeatherApp';
import { Provider } from 'react-redux';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <WeatherApp />
  </Provider>
);


