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
import WeiNew from '@/pages/Wei/WeiNew';
import WeiEdit from '@/pages/Wei/WeiEdit';
import RequirePermission from '@/features/roles/components/RequirePermission';
import RequireWeiStarted from '@/features/wei/components/RequireWeiStarted';
import RequireChallengeSubmittable from '@/features/wei/components/RequireChallengeSubmittable';
import Challenge from '@/pages/Wei/Challenge';
import ChallengeDetail from '@/pages/Wei/ChallengeDetail';
import ChallengeValidate from '@/pages/Wei/ChallengeValidate';
import ChallengeNew from '@/pages/Wei/ChallengeNew';
import ChallengeEdit from '@/pages/Wei/ChallengeEdit';

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
          
          <Route element={<RequirePermission action="view" resource="challenges" fallback={<RequireWeiStarted />} />}>
            <Route path="/wei/challenge" element={<Challenge />}/>
            <Route path="/wei/challenge/:challengeId" element={<ChallengeDetail />}/>
          </Route>

          <Route element={<RequirePermission action="view" resource="validations" fallback={<RequireChallengeSubmittable />} />}>
            <Route path="/wei/challenge/:challengeId/validate" element={<ChallengeValidate />}/>
          </Route>

          <Route element={<RequirePermission action="create" resource="challenges" />}>
            <Route path="/wei/challenge/new" element={<ChallengeNew />}/>
            <Route path="/wei/challenge/:challengeId/edit" element={<ChallengeEdit />}/>
          </Route>

          <Route element={<RequirePermission action="view" resource="wei_panel" />}>
            <Route path="/wei/panel" element={<WeiPanel />}/>
            <Route path="/wei/panel/:weiId" element={<WeiDetail />}/>
          </Route>

          <Route element={<RequirePermission action="create" resource="weis" />}>
            <Route path="/wei/new" element={<WeiNew />}/>
            <Route path="/wei/:weiId/edit" element={<WeiEdit />}/>
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
