import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routers from './routers/router'
import Auth from './authentic/AuthProvider';
import 'notyf/notyf.min.css'



function App() {
  return (
    <Auth>
      <RouterProvider router = { routers }/>
    </Auth>
  )
}

export default App;
