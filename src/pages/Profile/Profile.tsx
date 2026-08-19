import ProfileBanner from "@/features/profile/components/ProfileBanner";
import NotFound from "@/pages/NotFound";
import Navbar from "@/shared/components/layout/Navbar";
import useGetProfileRecord from "@/features/profile/hooks/useGetProfileRecord";
import IsatiAnimation from "@/shared/components/animations/IsatiAnimation";
import { Outlet, useParams } from "react-router";
import ProfileSidebar from "@/features/profile/components/ProfileSidebar";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import useHasPermission from "@/features/roles/hooks/useHasPermission";
import { useEffect } from "react";
 

export default function Profile() {
  
  const currentUser = useAuthStore((s) => s.user)
  const { username } = useParams();  
  const { isLoading, user, error } = useGetProfileRecord(username);
  
  const {allowed: canModerate} = useHasPermission(currentUser?.roles, "users", "update")
  const isForeign = !canModerate && (currentUser?.id !== user?.id)

  useEffect(() => {
    document.title = `${username} | ISATI`;
  }, [user]);

  if (isLoading) return (
    <>
      <Navbar />
      <div className="flex flex-1 items-center justify-center">
        <IsatiAnimation />
      </div>
    </>
    
  )
  
  if (!user || error) {
    return <NotFound />;
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto w-full max-w-3xl px-4 py-4 md:py-6 flex flex-col gap-4 md:gap-6">
        <ProfileBanner user={user} />
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-start">
          <aside className="w-full md:w-1/4 md:shrink-0">
            <ProfileSidebar foreign={isForeign}/>
          </aside>
          <section className="flex-1 min-w-0 bg-card text-card-foreground border border-border rounded-md p-4 md:p-6 shadow-sm">
            <Outlet context={{isLoading,user,error, isForeign}}/>
          </section>
        </div>
      </div>
    </>
  );
}
