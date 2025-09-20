import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
// import { Provider } from "react-redux";
import store from "./store/Store.ts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout.tsx";
import Private from "./layouts/PrivateLayout.tsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<PublicLayout />} />
          <Route path="/user/*" element={<Private />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
