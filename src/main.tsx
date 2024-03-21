import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import { store, persistor } from './redux_toolkit/store';
// import './index.css'

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        
        loading={<div>loading</div>}
        // onBeforeLift={() => {}}
        persistor={persistor}
      >
          <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
