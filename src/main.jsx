import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importing global CSS styles
import App from './App'; // Importing the main App component
import { Provider } from 'react-redux'; // Importing Provider to connect Redux with React
import store from './redux/store'; // Importing the Redux store

// Creating the root of the React app and rendering it to the DOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the app with the Redux provider, which makes the Redux store available to all components
root.render(
  <React.StrictMode>
    {/* The Provider component wraps the app, giving it access to the Redux store */}
    <Provider store={store}>
      {/* The main App component, which contains the rest of the app's components */}
      <App />
    </Provider>
  </React.StrictMode>
);
