export function Stats() {
  const stats = [
    {
      value: "10x",
      label: "Faster roadmap planning",
      description: "Ship features in weeks, not months",
    },
    {
      value: "85%",
      label: "Reduction in meetings",
      description: "Async collaboration that works",
    },
    {
      value: "2.5x",
      label: "More user feedback",
      description: "Built-in research tools",
    },
    {
      value: "100%",
      label: "Team alignment",
      description: "Everyone on the same page",
    },
  ]

  return (
    <section className="border-y border-border bg-muted/30 px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 text-5xl font-bold text-primary sm:text-6xl">{stat.value}</div>
              <div className="mb-1 text-base font-semibold text-foreground">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
