import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
// import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    // element: 
    //PageLayout
    children: [
      {
        path: 'login',
        // login-signup
      },
      {
        path: '/home',
        // login-signup
      },
      {
        path: '/home/chats/chatId',
        // login-signup
      },
      {
        path: '/home/userProfile/:userId',
        // login-signup
      },
    ]

  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)