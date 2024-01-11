import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ThemeProvider from './context/ThemeProvider.jsx'
import { LoginProvider } from './context/LoginContext.jsx'



ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    <LoginProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </LoginProvider>
  </React.StrictMode>
);
