import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";

// Create the root element for the React application
ReactDOM.createRoot(document.getElementById("root")).render(
  
    <Provider store={store}>
      {/* Set up routing for the application */}
      <BrowserRouter>
        {/* Render the main App component */}
        <App />
      </BrowserRouter>
    </Provider>
);
