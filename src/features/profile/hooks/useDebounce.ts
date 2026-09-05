import { useEffect, useState } from "react";

 
export default function useDebounce(value: string, delay: number): string {
  const [debouncedQuery, setQueryDebounce] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setQueryDebounce(value), delay);
    return () => clearTimeout(timer)
  }, [value, delay])
  return debouncedQuery
}