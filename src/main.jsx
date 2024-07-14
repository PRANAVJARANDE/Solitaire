import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Rules from './Components/Rules/Rules.jsx'
import Home from './Components/Home/Home.jsx'

let router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App/>}>
      <Route path='' element=<Home/>></Route>
      <Route path='/rules' element=<Rules/>></Route>
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  </Provider>
)
