import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { Store, persistor } from "./Redux/Store";
import { PersistGate } from 'redux-persist/integration/react'
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-confirm-alert/src/react-confirm-alert.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
<PersistGate loading={null} persistor={persistor}>
  <Provider store={Store}>
    <App/>
  </Provider>
</PersistGate>
  
);
