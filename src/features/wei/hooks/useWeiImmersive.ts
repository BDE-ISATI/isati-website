import { useLocation } from "react-router";
import useCurrentWei from "@/features/wei/hooks/queries/useCurrentWei";


export default function useWeiImmersive() {

  const { pathname } = useLocation()
  const currentWei = useCurrentWei()

  return pathname === "/wei" && !!currentWei.data

}
