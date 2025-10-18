import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-16">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <div className="relative z-10 mx-auto max-w-7xl text-center">
        {/* Badge */}
        <div className="mb-4 mt-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
          <Sparkles className="h-4 w-4" />
          <span>Ship products that matter</span>
        </div>

        {/* Main heading */}
        <h1 className="mb-6 text-balance text-6xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-9xl">
          Build products
          <br />
          <span className="text-primary">customers love</span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mb-2 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl md:text-2xl">
          The complete platform for product teams to prioritize, collaborate, and ship features that drive real business
          impact.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="group h-12 gap-2 px-8 text-base font-semibold">
            Start building free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold bg-transparent">
            Watch demo
          </Button>
        </div>

        {/* Trust indicators */}
        <p className="mt-4 text-sm text-muted-foreground">Trusted by product teams at leading companies worldwide</p>
      </div>

      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>
    </section>
  )
}
