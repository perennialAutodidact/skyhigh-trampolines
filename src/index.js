import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./styles/index.scss";
import App from "./App";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Helmet, HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <Provider store={store}>
          <Helmet>
            <script
              src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}&libraries=places`}
              async
            ></script>
          </Helmet>
          <App />
        </Provider>
      </Router>
    </HelmetProvider>
  </React.StrictMode>
);
