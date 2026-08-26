import './App.css'
import { Routes, Route, Navigate } from "react-router";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useEffect } from 'react';
import LoginPage from '@/pages/Auth/LoginPage'
import RegisterPage from '@/pages/Auth/RegisterPage'
import OnboardingPage from '@/pages/Auth/OnboardingPage'
import AuthLayout from '@/pages/Auth/AuthLayout'
import Home from '@/pages/Home.tsx'
import Layout from '@/shared/components/layout/Layout'
import Profile from '@/pages/Profile/Profile'
import NotFound from '@/pages/NotFound'

import Account from '@/pages/Profile/settings/Account';
import Activities from '@/pages/Profile/settings/Activities';
import Clubs from '@/pages/Profile/settings/Clubs';
import Tools from '@/pages/Profile/settings/Tools';
import Wei from '@/pages/Wei/Wei';
import WeiPanel from '@/pages/Wei/WeiPanel';
import WeiDetail from '@/pages/Wei/WeiDetail';
import RequirePermission from '@/features/roles/components/RequirePermission';

function App() {

  const init = useAuthStore((s) => s.init)

  useEffect(() => {
    init();
  },[init])

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />}  />
          <Route path="/wei" element={<Wei />}/>

          <Route element={<RequirePermission action="view" resource="wei_panel" />}>
            <Route path="/wei/panel" element={<WeiPanel />}/>
            <Route path="/wei/panel/:weiId" element={<WeiDetail />}/>
          </Route>
          
          
          <Route path="/profile/:username" element={<Profile />}>
            <Route index element={<Navigate to="account" />} />
            <Route path="account" element={<Account />}/>
            <Route path="activities" element={<Activities />}/>
            <Route path="clubs" element={<Clubs />}/>
            <Route path="tools" element={<Tools />}/>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="onboarding" element={<OnboardingPage />} />
        </Route>
        
      </Routes>
        
    </>
  )

}

export default App
