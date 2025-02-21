import { createRoot } from 'react-dom/client'
import './style.scss'
import React from 'react'
import App from './App'
import RouterContextProvider from './context/RouterContextProvider'

createRoot(document.getElementById('root')).render(
  <RouterContextProvider>
    <App />
  </RouterContextProvider>
)
