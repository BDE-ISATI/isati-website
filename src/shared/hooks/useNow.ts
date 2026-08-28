import { useEffect, useState } from "react";


export default function useNow(intervalMs: number = 1000) {

  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs])

  return now

}
