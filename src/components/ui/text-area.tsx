import * as React from "react"

import { cn } from "@/lib/utils"
import { useFormField } from "@/components/ui/form";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  const { error } = useFormField()

  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-[#919EAB52]",
        className,
        error && "border-error-main/80",
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
