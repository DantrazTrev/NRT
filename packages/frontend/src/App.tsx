import React, { useState } from 'react';
import './App.css';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Chat from './pages/Chat';
import Login from './pages/Login';


function App() {
  const [user, setUser] = useState(null)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/chat",
      element: <Chat />,
    },
  ]);
  return (

    <RouterProvider router={router} />
  );
}

export default App;
