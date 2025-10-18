"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Menu, X } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import SvgIcon from "./Icon"

export function Navbar() {
 
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, handleLogout } = useAuth();


  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products Manage", href: "/products" },
   
  ]

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[95%] md:w-auto -translate-x-1/2">
      <nav
        className="
          relative flex items-center justify-between gap-6
          rounded-full border border-white/20
          bg-white/10 dark:bg-black/20
          backdrop-blur-xl shadow-lg px-6 py-3
          text-sm text-[var(--foreground)]
        "
      >
        {/* Left Section (Logo / Brand) */}
        <Link
          href="/"
          className="font-semibold text-lg tracking-tight"
        >
          <SvgIcon/>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`
                transition-colors duration-300
                ${pathname === link.href
                  ? "text-[var(--color-accent)] font-medium"
                  : "hover:text-[var(--color-accent)]"}
              `}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />
          <Button variant="outline" size="sm" onClick={handleLogout}>
           {isAuthenticated ? "Logout" : "Login"}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div
            className="
              absolute top-full left-0 mt-3 w-full
              flex flex-col items-center gap-3
              rounded-2xl border border-white/20
              bg-white/10 dark:bg-black/20
              backdrop-blur-xl py-4 shadow-lg
              md:hidden
            "
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`
                  transition-colors duration-300
                  ${pathname === link.href
                    ? "text-[var(--color-accent)] font-medium"
                    : "hover:text-[var(--color-accent)]"}
                `}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-3">
              <ModeToggle />
              <Button variant="outline" size="sm" onClick={handleLogout}>
                {isAuthenticated ? "Logout" : "Login"}
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
