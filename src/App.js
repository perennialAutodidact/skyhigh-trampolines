import './App.scss'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Admin } from './components/Admin'
import { Customer } from './components/Customer'
import Login from './components/login/Login'
import { ProtectedRoute } from './components/ProtectedRoute'
import React, { useState } from 'react'
import { auth } from './firebase/client'
import { useAuthState } from 'react-firebase-hooks/auth'
import AddOnForm from './components/AddOnForm'
//

function App() {
  const [user, loading] = useAuthState(auth)
  // state to toggle sidebar in admin
  const [toggleSidebar, setToggleSidebar] = useState(false)
  //
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAllowed={!!user} loading={loading}>
                <Admin />
                <AddOnForm />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Customer />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  )
}

export default App
