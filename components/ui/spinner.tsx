<<<<<<< HEAD
import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
=======
import { Loader2Icon } from "lucide-react";

import { cn } from "#lib/utils";
>>>>>>> dev

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
<<<<<<< HEAD
  )
}

export { Spinner }
=======
  );
}

export { Spinner };
>>>>>>> dev
