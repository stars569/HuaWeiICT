import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routers from './routers/router'



function App() {
  return (
    <RouterProvider router = { routers }/>
  );
}

export default App;
