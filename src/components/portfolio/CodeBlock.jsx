export default function CodeBlock({ language, code }) {
  const lines = code.split("\n");

  return (
    <div className="border border-border bg-card overflow-x-auto">
      <div className="flex items-center justify-between border-b border-border p-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <span className="text-primary">{language}</span>
        <span>read-only</span>
      </div>
      <pre className="p-4 leading-relaxed">
        {lines.map((line, idx) => (
          <div key={idx} className="flex">
            <span className="w-8 shrink-0 select-none pr-4 text-right font-mono text-muted-foreground/40">
              {idx + 1}
            </span>
            <code className="whitespace-pre text-foreground">
              {line.length > 0 ? line : " "}
            </code>
          </div>
        ))}
      </pre>
    </div>
  );
}
