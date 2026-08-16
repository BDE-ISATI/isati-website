import './App.css'
import { Routes, Route, Navigate } from "react-router";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useEffect } from 'react';
import LoginPage from '@/pages/Auth/LoginPage'
import RegisterPage from '@/pages/Auth/RegisterPage'
import OnboardingPage from '@/pages/Auth/OnboardingPage'
import AuthLayout from '@/pages/Auth/AuthLayout'
import Home from '@/pages/Home.tsx'
import Profile from '@/pages/Profile/Profile'
import NotFound from '@/pages/NotFound'

import Account from '@/pages/Profile/settings/Account';
import Activities from '@/pages/Profile/settings/Activities';
import Clubs from '@/pages/Profile/settings/Clubs';
import Tools from '@/pages/Profile/settings/Tools';

function App() {

  const init = useAuthStore((s) => s.init)

  useEffect(() => {
    init();
  },[init])

  return (
    <>
      <Routes>
        <Route index element={<Home />}  />
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="onboarding" element={<OnboardingPage />} />
        </Route>

        <Route path="/profile/:username" element={<Profile />}>
          <Route index element={<Navigate to="account" replace/>} />
          <Route path="account" element={<Account />}/>
          <Route path="activities" element={<Activities />}/>
          <Route path="clubs" element={<Clubs />}/>
          <Route path="tools" element={<Tools />}/>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
        
    </>
  )

}

export default App
