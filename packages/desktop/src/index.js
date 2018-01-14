import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'leaflet/dist/leaflet.css';
import './index.css';
import App from '_connectors/App';
import Connector from '_connectors';
//import registerServiceWorker from './registerServiceWorker';
import L from 'leaflet';
import ErrorBoundary from './components/ErrorBoundary';
// patch:
// See: https://github.com/PaulLeCam/react-leaflet/issues/255
// L.Icon.Default.imagePath = '.';
// OR
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
// end patch
ReactDOM.render(
  <ErrorBoundary>
    <Connector>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Connector>
  </ErrorBoundary>,
  document.getElementById('root'),
);
// registerServiceWorker();
