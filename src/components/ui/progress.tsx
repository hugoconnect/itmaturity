import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value?: number }
>(({ className, value, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-brand-secondary/20", className)}
    {...props}
  >
    <div
      className="h-full w-full flex-1 bg-brand-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
