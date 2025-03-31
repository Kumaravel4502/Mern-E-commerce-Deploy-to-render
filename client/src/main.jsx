import { createRoot } from "react-dom/client";

import "./style.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
// import { Toaster } from "./components/ui/toaster.jsx";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
     <App/>
      <ToastContainer />
    </Provider>
  </BrowserRouter>
);