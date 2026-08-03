import './App.css'
import { Routes, Route } from "react-router";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useEffect } from 'react';
import LoginPage from '@/pages/LoginPage.tsx'
import RegisterPage from '@/pages/RegisterPage.tsx'
import OnboardingPage from '@/pages/OnboardingPage.tsx'
import AuthLayout from '@/pages/AuthLayout.tsx'
import Home from '@/pages/Home.tsx'
import Profile from '@/pages/Profile.tsx'

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
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
        
    </>
  )

}

export default App
