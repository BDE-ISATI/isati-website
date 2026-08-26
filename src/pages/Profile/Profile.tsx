import ProfileBanner from "@/features/profile/components/ProfileBanner";
import NotFound from "@/pages/NotFound";
import useUser from "@/shared/hooks/useUser";
import IsatiAnimation from "@/shared/components/animations/IsatiAnimation";
import { Outlet, useParams } from "react-router";
import ProfileSidebar from "@/features/profile/components/ProfileSidebar";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import useHasPermission from "@/features/roles/hooks/useHasPermission";
import { useEffect } from "react";
 

export default function Profile() {
  
  const loggedInUser = useAuthStore((s) => s.user)
  const { username } = useParams();  
  const { data: profileUser, isLoading, error } = useUser({username: username});
  
  console.log(error)

  const canModerate = useHasPermission("update", "users")
  const isForeign = !canModerate && (loggedInUser?.id !== profileUser?.id)

  useEffect(() => {
    document.title = `${username} | ISATI`;
  }, [profileUser]);

  if (isLoading) return (
    <div className="flex flex-1 items-center justify-center">
      <IsatiAnimation />
    </div>
  )
  
  
  if (!profileUser || error) {
    return <NotFound />;
  }

  return (
      <div className="mx-auto w-full max-w-3xl px-4 py-4 md:py-6 flex flex-col gap-4 md:gap-6">
        <ProfileBanner user={profileUser} />
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-start">
          <aside className="w-full md:w-1/4 md:shrink-0">
            <ProfileSidebar foreign={isForeign}/>
          </aside>
          <section className="flex-1 min-w-0 bg-card text-card-foreground border border-border rounded-md p-4 md:p-6 shadow-sm">
            <Outlet context={{user: profileUser, isForeign}}/>
          </section>
        </div>
      </div>
  );
}
