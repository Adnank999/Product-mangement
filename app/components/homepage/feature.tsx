"use client"

import { Target, Users, BarChart3, Zap, MessageSquare, GitBranch } from "lucide-react"
import { GlowingCards, GlowingCard } from "./glowing"

export function Features() {
  const features = [
    {
      icon: Target,
      title: "Strategic Roadmaps",
      description:
        "Visualize your product strategy with intuitive roadmaps that align teams and stakeholders on priorities.",
      glowColor: "#3b82f6", // Blue
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Real-time collaboration tools that keep everyone in sync, from ideation to launch.",
      glowColor: "#8b5cf6", // Purple
    },
    {
      icon: BarChart3,
      title: "Data-Driven Insights",
      description: "Make informed decisions with analytics and metrics that matter to your business.",
      glowColor: "#10b981", // Green
    },
    {
      icon: Zap,
      title: "Rapid Iteration",
      description: "Ship faster with streamlined workflows and automated processes that eliminate bottlenecks.",
      glowColor: "#f59e0b", // Orange
    },
    {
      icon: MessageSquare,
      title: "Customer Feedback",
      description: "Capture and analyze user feedback directly in your workflow to build what customers need.",
      glowColor: "#ec4899", // Pink
    },
    {
      icon: GitBranch,
      title: "Release Management",
      description: "Plan, track, and communicate releases with confidence using powerful release tools.",
      glowColor: "#06b6d4", // Cyan
    },
  ]

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Everything you need to
            <br />
            <span className="text-primary">ship great products</span>
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Powerful features designed for modern product teams who want to move fast without breaking things.
          </p>
        </div>

        {/*    gridColor="#d1d5db"
                darkGridColor="rgb(31 41 55,0.1)"
                beamColor="rgba(0,180,255,0.8)"
                darkBeamColor="rgba(0,255,255,0.8)" */}

        <GlowingCards
          enableGlow={true}
          glowRadius={50}
          glowOpacity={1}
          animationDuration={400}
          gap="1.5rem"
          responsive={true}
         
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <GlowingCard
                key={index}
                glowColor={feature.glowColor}
                className="bg-secondary group transition-all"
              >
                <div
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-300"
                  style={{
                    color: feature.glowColor,
                  }}
                >
                  <Icon
                    className="h-6 w-6 transition-colors duration-300 group-hover:opacity-80"
                    style={{
                      transition: "color 0.3s ease",
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {feature.description}
                </p>
              </GlowingCard>

            )
          })}
        </GlowingCards>
      </div>
    </section>
  )
}
