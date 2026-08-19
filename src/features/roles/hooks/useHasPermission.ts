import useGetRoles from './useGetRoles';

export default function useHasPermission(
  userRoleIds: string[] | undefined,
  resource: string,
  action: string
) {
  const { roles, isLoading } = useGetRoles(userRoleIds);
  const allowed = roles?.some((role) =>{
    return role.expand?.policies?.some((p) => { 
      
      const isAdminWildcard = p.resource === "all" && p.action === "all";
      const matches = p.resource === resource && p.action === action;
      return isAdminWildcard || matches;
    })
  }
    
    
  ) ?? false;

  return { allowed, isLoading };
}