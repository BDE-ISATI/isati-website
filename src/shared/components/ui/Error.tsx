
import cn from "@/shared/utils/cn"
import CircleAlert from "@/assets/icons/circle-alert.svg?react"


type ErrorProps = {
  message?: string,
  className?: string,
}


export default function Error({ message, className }: ErrorProps) {
  if (!message) return null
  return (
    <div className={cn("flex flex-row items-center gap-1 text-status-critical", className)}>
      <CircleAlert className="w-3 h-3 shrink-0"/>
      <span className="text-xs">{message}</span>
    </div>
  )

}
