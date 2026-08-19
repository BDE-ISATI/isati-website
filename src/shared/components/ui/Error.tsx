
import CircleAlert from "@/assets/icons/circle-alert.svg?react"


type ErrorProps = {
  message?: string
}


export default function Error({ message }: ErrorProps) {
  if (!message) return null
  return (
    <div className="flex flex-row items-center gap-1 text-status-critical">
      <CircleAlert className="w-3 h-3 shrink-0"/>
      <span className="text-xs">{message}</span>
    </div>
  )

}