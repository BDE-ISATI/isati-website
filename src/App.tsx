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
import RequireWeiParticipant from '@/features/wei/components/RequireWeiParticipant';
import RequireChallengeSubmittable from '@/features/wei/components/RequireChallengeSubmittable';
import Challenge from '@/pages/Wei/Challenge';
import ChallengeDetail from '@/pages/Wei/ChallengeDetail';
import ChallengeValidate from '@/pages/Wei/ChallengeValidate';
import ChallengeNew from '@/pages/Wei/ChallengeNew';
import ChallengeEdit from '@/pages/Wei/ChallengeEdit';
import Team from '@/pages/Wei/Team';
import TeamDetail from '@/pages/Wei/TeamDetail';
import Validation from '@/pages/Wei/Validation';
import ValidationDetail from '@/pages/Wei/ValidationDetail';
import WeiLeaders from '@/pages/Wei/WeiLeaders';
import FactionNew from '@/pages/Wei/FactionNew';
import FactionEdit from '@/pages/Wei/FactionEdit';
import TeamNew from '@/pages/Wei/TeamNew';
import TeamEdit from '@/pages/Wei/TeamEdit';

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
          
          <Route element={<RequirePermission action="view" resource="challenges" fallback={<RequireWeiParticipant />} />}>
            <Route path="/wei/challenge" element={<Challenge />}/>
            <Route path="/wei/challenge/:challengeId" element={<ChallengeDetail />}/>
          </Route>

          <Route element={<RequirePermission action="view" resource="teams" fallback={<RequireWeiParticipant />} />}>
            <Route path="/wei/team" element={<Team />}/>
            <Route path="/wei/team/:teamId" element={<TeamDetail />}/>
          </Route>

          <Route element={<RequirePermission action="view" resource="validations" fallback={<RequireChallengeSubmittable />} />}>
            <Route path="/wei/challenge/:challengeId/validate" element={<ChallengeValidate />}/>
          </Route>

          <Route element={<RequirePermission action="view" resource="validations" />}>
            <Route path="/wei/validation" element={<Validation />}/>
            <Route path="/wei/validation/:validationId" element={<ValidationDetail />}/>
          </Route>

          <Route element={<RequirePermission action="create" resource="challenges" />}>
            <Route path="/wei/challenge/new" element={<ChallengeNew />}/>
            <Route path="/wei/challenge/:challengeId/edit" element={<ChallengeEdit />}/>
          </Route>

          <Route element={<RequirePermission action="view" resource="wei_panel" />}>
            <Route path="/wei/panel" element={<WeiPanel />}/>
            <Route path="/wei/panel/:weiId" element={<WeiDetail />}/>
            <Route path="/wei/panel/:weiId/leaders" element={<WeiLeaders />}/>
          </Route>

          <Route element={<RequirePermission action="create" resource="teams" />}>
            <Route path="/wei/panel/:weiId/factions/new" element={<FactionNew />}/>
            <Route path="/wei/panel/:weiId/factions/:factionId/edit" element={<FactionEdit />}/>
            <Route path="/wei/panel/:weiId/teams/new" element={<TeamNew />}/>
            <Route path="/wei/panel/:weiId/teams/:teamId/edit" element={<TeamEdit />}/>
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
