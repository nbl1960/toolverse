import type { ToolExample } from "@/lib/types";

interface ExampleCalculationProps {
  example: ToolExample;
}

/**
 * Renders a worked example: the scenario, the inputs used, and the
 * resulting outputs, side by side. Any tool opts in by adding an
 * `example` object to its registry entry — `ToolPageShell` renders this
 * automatically, so the markup exists once, not per tool.
 */
export function ExampleCalculation({ example }: ExampleCalculationProps) {
  return (
    <section aria-labelledby="example-heading" className="mt-16">
      <h2 id="example-heading" className="font-display text-xl font-semibold text-foreground">
        {example.title}
      </h2>
      <div className="mt-4 rounded-lg border border-border bg-card p-6">
        <p className="text-sm leading-relaxed text-muted-foreground">{example.summary}</p>
        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Inputs
            </p>
            <dl className="mt-2 flex flex-col gap-2">
              {example.inputs.map((line) => (
                <div key={line.label} className="flex items-baseline justify-between gap-3 text-sm">
                  <dt className="text-muted-foreground">{line.label}</dt>
                  <dd className="font-mono text-foreground">{line.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brass">Results</p>
            <dl className="mt-2 flex flex-col gap-2">
              {example.outputs.map((line) => (
                <div key={line.label} className="flex items-baseline justify-between gap-3 text-sm">
                  <dt className="text-muted-foreground">{line.label}</dt>
                  <dd className="font-mono font-semibold text-foreground">{line.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
