import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-muted-foreground">
        <Compass className="h-5 w-5" aria-hidden="true" />
      </div>
      <div>
        <h1 className="font-display text-xl font-semibold text-foreground">
          Page not found
        </h1>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          This page wandered off the map. Let&apos;s get you back to the workshop.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Back to ToolVerse</Link>
      </Button>
    </div>
  );
}
