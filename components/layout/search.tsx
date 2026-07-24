"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchTools } from "@/lib/tools-registry";
import { getCategoryBySlug } from "@/lib/categories";
import { resolveIcon } from "@/lib/icon-map";
import { cn } from "@/lib/utils";

/**
 * Site-wide search: a trigger button (with a ⌘K hint) that opens a command
 * palette searching the tool registry by name, tagline, description, and
 * keywords. Works the same whether the catalog has 7 tools or 700, since
 * it filters `TOOLS` directly rather than any page-specific list.
 */
export function ToolSearch() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const results = React.useMemo(() => searchTools(query).slice(0, 8), [query]);

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  React.useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  function goToTool(slug: string, isLive: boolean) {
    if (!isLive) return;
    setOpen(false);
    router.push(`/tools/${slug}`);
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="h-9 w-9 justify-center px-0 sm:h-10 sm:w-56 sm:justify-between sm:px-3"
        aria-label="Search tools"
      >
        <span className="flex items-center gap-2 text-muted-foreground">
          <SearchIcon className="h-4 w-4" aria-hidden="true" />
          <span className="hidden text-sm sm:inline">Search tools…</span>
        </span>
        <kbd className="hidden rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
          ⌘K
        </kbd>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="top-24 max-w-xl translate-y-0 gap-0 sm:top-24" hideCloseButton>
          <DialogHeader className="p-4 pb-3">
            <DialogTitle className="sr-only">Search tools</DialogTitle>
            <DialogDescription className="sr-only">
              Search the ToolVerse catalog by name or keyword.
            </DialogDescription>
            <div className="relative">
              <SearchIcon
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                ref={inputRef}
                autoFocus
                placeholder="Search for a tool… (e.g. email, resume, regex)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-11 pl-9"
              />
            </div>
          </DialogHeader>

          <div className="scrollbar-thin max-h-80 overflow-y-auto border-t border-border p-2">
            {results.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                No tools match &ldquo;{query}&rdquo; yet.
              </p>
            ) : (
              <ul className="flex flex-col gap-0.5">
                {results.map((tool) => {
                  const Icon = resolveIcon(tool.iconName);
                  const category = getCategoryBySlug(tool.category);
                  const isLive = tool.status === "live";
                  return (
                    <li key={tool.slug}>
                      <button
                        type="button"
                        onClick={() => goToTool(tool.slug, isLive)}
                        disabled={!isLive}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors",
                          isLive
                            ? "hover:bg-accent focus-visible:bg-accent"
                            : "cursor-not-allowed opacity-60",
                          "focus-visible:outline-none"
                        )}
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brass/40 bg-accent text-accent-foreground">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-foreground">
                            {tool.name}
                          </span>
                          <span className="block truncate text-xs text-muted-foreground">
                            {isLive ? tool.tagline : `Coming soon · ${category?.name}`}
                          </span>
                        </span>
                        {isLive && (
                          <ArrowRight
                            className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
