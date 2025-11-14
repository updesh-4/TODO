import React from 'react';
import {Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Todos from './pages/Todos';
import { getToken } from './stores/authStore';

const Private = ({children}:{children:JSX.Element}) => {
  if(!getToken()) return <Navigate to='/login' />
  return children;
}

export default function App(){
  return (
    <Routes>
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/forgot' element={<ForgotPassword/>} />
      <Route path='/reset' element={<ResetPassword/>} />
      <Route path='/' element={<Private><Todos/></Private>} />
    </Routes>
  )
}
