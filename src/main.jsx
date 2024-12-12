import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import './style.scss'
import ContextProvider from './context/ContextProvider'
import Root from './pages/Root'
import ErrorPage from './pages/ErrorPage'
import Login from './pages/Login'
import Home from './pages/Home'
import React from 'react'

const router = createBrowserRouter([{
  path: '/',
  errorElement: <ErrorPage />,
  element: <Root />,
  children: [{
    path: '/login',
    element: <Login/>
  },{
    path: '/home',
    element: <Home />
  }]
}])

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
)
