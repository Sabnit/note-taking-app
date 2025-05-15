import React from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App.jsx";

import QueryProvider from "./context/QueryProvider.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AppUIProvider } from "./context/AppUIContext.jsx";
import { NoteProvider } from "./context/NoteContext.jsx";
import { CategoryProvider } from "./context/CategoryContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryProvider>
      <AuthProvider>
        <AppUIProvider>
          <NoteProvider>
            <CategoryProvider>
              <ToastContainer />
              <App />
            </CategoryProvider>
          </NoteProvider>
        </AppUIProvider>
      </AuthProvider>
    </QueryProvider>
  </BrowserRouter>
);
