import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import LoginScreen from './screens/login.jsx';
import store from './store.js';
import RegisterScreen from './screens/register.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/privateRoute.jsx';
import Home from './screens/home.jsx';
import AddTask from './screens/addTask.jsx';
import WorkTask from './screens/workTask.jsx';
import PersonalTask from './screens/personalTask.jsx';
import UpdateTask from './screens/updateTask.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      {/* PRIVATE ROUTE */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/home' element={<Home />} />
        <Route path='/addTask' element={<AddTask />} />
        <Route path='/workTask' element={<WorkTask />} />
        <Route path='/personalTask' element={<PersonalTask />} />
        <Route path='updateTask' element={<UpdateTask />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
