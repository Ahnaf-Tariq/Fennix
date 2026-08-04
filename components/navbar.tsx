"use client"

import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { NAV_LINKS } from "@/Data/data"
import { cn } from "@/lib/utils"

const Navbar = () => {
  const [isPastHero, setIsPastHero] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      const hero = document.getElementById("hero")
      if (!hero) {
        setIsPastHero(window.scrollY > 48)
        return
      }

      setIsPastHero(hero.getBoundingClientRect().bottom <= 0)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = ""
      return
    }

    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  function closeMobileMenu() {
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500",
        isPastHero
          ? "border-b border-[#d7e6f5]/90 bg-white/80 shadow-[0_10px_40px_-24px_rgba(6,27,49,0.35)] backdrop-blur-xl"
          : "border-b border-white/10 bg-transparent",
      )}
    >
      {isPastHero && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/35 to-transparent"
        />
      )}

      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-3 py-2.5 sm:px-6">
        <a href="#home" className="group relative z-10 shrink-0">
          <Image
            src="/images/Fennix-BLACK.png"
            alt="Fennix"
            width={100}
            height={100}
            className={cn(
              "transition-[filter,transform,opacity] duration-300 group-hover:opacity-90 group-hover:scale-[1.02]",
              isPastHero ? "" : "brightness-0 invert",
            )}
          />
        </a>

        <nav
          className={cn(
            "absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block",
          )}
        >
          <ul
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500",
              isPastHero
                ? "border border-[#d7e6f5] bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_24px_-18px_rgba(20,86,168,0.35)] backdrop-blur-md"
                : "border border-white/10 bg-white/5 backdrop-blur-md",
            )}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink link={link} isPastHero={isPastHero} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <button
            type="button"
            className={cn(
              "btn-primary btn-glass-shimmer group hidden items-center gap-2 px-4 py-2.5 lg:inline-flex",
              isPastHero &&
                "shadow-[0_12px_28px_-14px_rgba(20,86,168,0.65)]",
            )}
          >
            Start Your 30-Day Pilot
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </button>

          <motion.button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className={cn(
              "relative flex h-11 w-11 items-center justify-center rounded-xl border backdrop-blur-md transition-all duration-300 lg:hidden",
              isPastHero
                ? "border-[#d7e6f5] bg-white text-zinc-900 shadow-[0_10px_24px_-16px_rgba(6,27,49,0.5)]"
                : "border-white/20 bg-white/10 text-white",
            )}
            whileTap={{ scale: 0.95 }}
            style={{ perspective: 600 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.span
                  key="close-icon"
                  initial={{ rotateY: -90, opacity: 0, scale: 0.82 }}
                  animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                  exit={{ rotateY: 90, opacity: 0, scale: 0.82 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute cursor-pointer"
                >
                  <CloseIcon />
                </motion.span>
              ) : (
                <motion.span
                  key="menu-icon"
                  initial={{ rotateY: 90, opacity: 0, scale: 0.82 }}
                  animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                  exit={{ rotateY: -90, opacity: 0, scale: 0.82 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute cursor-pointer"
                >
                  <MenuIcon />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 top-16.5 z-40 lg:hidden"
          >
            <div
              className={cn(
                "absolute inset-0 backdrop-blur-sm",
                isPastHero ? "bg-black/25" : "bg-[#061B31]/65",
              )}
              onClick={closeMobileMenu}
              aria-hidden
            />

            <motion.nav
              initial={{ y: -22, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -22, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "relative mx-3 mt-3 rounded-2xl p-4",
                isPastHero
                  ? "border border-[#d7e6f5] bg-white/95 shadow-[0_22px_55px_-30px_rgba(6,27,49,0.45)] backdrop-blur-xl"
                  : "border border-white/15 bg-[linear-gradient(150deg,#0d2f54_0%,#0a2745_50%,#061b31_100%)] shadow-[0_25px_65px_-30px_rgba(2,9,18,0.9)]",
              )}
            >
              <ul className="space-y-2">
                {NAV_LINKS.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.03 * index,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        "group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300",
                        isPastHero
                          ? "border border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-primary/30 hover:bg-primary/4 hover:text-zinc-900"
                          : "border border-white/10 bg-white/5 text-white/90 hover:border-white/25 hover:bg-white/10",
                      )}
                    >
                      <span>{link.label}</span>
                      <span
                        className={cn(
                          "transition-transform duration-300 group-hover:translate-x-1",
                          isPastHero
                            ? "text-zinc-400 group-hover:text-primary"
                            : "text-white/35 group-hover:text-white/70",
                        )}
                      >
                        →
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="btn-primary mt-4 w-full justify-center gap-2 py-2.5"
                onClick={closeMobileMenu}
              >
                Start Your 30-Day Pilot
                <ArrowRight size={15} />
              </motion.button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

const NavLink = ({
  link,
  isPastHero,
}: {
  link: { href: string; label: string }
  isPastHero: boolean
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={link.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative flex h-9 items-center justify-center overflow-hidden rounded-full px-4 transition-colors duration-300",
        isPastHero ? "hover:bg-primary/6" : "hover:bg-white/10",
      )}
    >
      <span className="relative flex h-5 flex-col items-center justify-center overflow-hidden">
        <motion.span
          animate={{ y: isHovered ? "-100%" : "0%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "whitespace-nowrap text-sm font-medium transition-colors duration-300",
            isPastHero ? "text-zinc-500" : "text-white/75",
          )}
        >
          {link.label}
        </motion.span>

        <motion.span
          animate={{ y: isHovered ? "-100%" : "0%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "absolute top-full whitespace-nowrap text-sm font-semibold transition-colors duration-300",
            isPastHero ? "text-primary-gradient" : "text-white",
          )}
        >
          {link.label}
        </motion.span>
      </span>

      <motion.span
        aria-hidden
        className={cn(
          "absolute bottom-1.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full",
          isPastHero ? "bg-primary" : "bg-white",
        )}
        initial={false}
        animate={{
          width: isHovered ? 14 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      />
    </a>
  )
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 7H20M4 12H20M4 17H20"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default Navbar
