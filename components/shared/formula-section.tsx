import type { ToolFormula } from "@/lib/types";

interface FormulaSectionProps {
  formula: ToolFormula;
}

/**
 * Renders a tool's underlying formula: the expression, a plain-language
 * explanation, and a symbol legend. Any tool opts in by adding a `formula`
 * object to its registry entry — `ToolPageShell` renders this component
 * automatically, so the markup exists once, not per tool.
 */
export function FormulaSection({ formula }: FormulaSectionProps) {
  return (
    <section aria-labelledby="formula-heading" className="mt-16">
      <h2 id="formula-heading" className="font-display text-xl font-semibold text-foreground">
        {formula.title}
      </h2>
      <div className="mt-4 rounded-lg border border-border bg-card p-6">
        <p className="overflow-x-auto whitespace-nowrap rounded-md bg-muted/50 px-4 py-3 text-center font-mono text-sm text-foreground sm:text-base">
          {formula.expression}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{formula.description}</p>
        {formula.variables.length > 0 && (
          <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
            {formula.variables.map((variable) => (
              <div key={variable.symbol} className="flex gap-2 text-sm">
                <dt className="shrink-0 font-mono font-semibold text-brass">{variable.symbol}</dt>
                <dd className="text-muted-foreground">{variable.meaning}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
