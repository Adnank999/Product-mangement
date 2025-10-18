'use client'

import { useTheme } from "next-themes"
import BeamGridBackground from "./beamBackground"
import { Features } from "./feature"
import { Hero } from "./hero"
import { Stats } from "./stats"

export default function HomePageWrapper() {
    const { theme, systemTheme } = useTheme();

    const currentTheme = theme === "system" ? systemTheme : theme;

    return (
        <div className="min-h-screen">
            <BeamGridBackground
                gridSize={20}
                gridColor="#d1d5db"

                darkGridColor={currentTheme === "dark" ? "#1f2937" : "#ffffff"}
                beamColor="rgba(0,180,255,0.8)"
                darkBeamColor={currentTheme === "dark" ? "rgba(0,255,255,0.8)" : "#ffffff"}
                beamCount={8}
                extraBeamCount={3}
                beamThickness={3}
                beamGlow
                glowIntensity={50}
                idleSpeed={1.15}
               

            />


          
                <Hero />
                <Stats />
                <Features />
        



        </div>
    )
}