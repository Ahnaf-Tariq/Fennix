"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/Data/data";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const hero = document.getElementById("hero");
      if (!hero) {
        setIsPastHero(window.scrollY > 48);
        return;
      }

      setIsPastHero(hero.getBoundingClientRect().bottom <= 0);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300",
        isPastHero
          ? "border-b border-black/10 bg-white"
          : "border-b border-white/10 bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto flex w-full items-center justify-between px-2 sm:px-6 py-2.5">
        <Image
          src="/images/Fennix-BLACK.png"
          alt="Logo"
          width={100}
          height={100}
          className={cn(
            "transition-[filter] duration-300",
            isPastHero ? "" : "brightness-0 invert",
          )}
        />

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavLink link={link} isPastHero={isPastHero} />
            </li>
          ))}
        </ul>

        <button className="btn-primary btn-glass-shimmer px-4 py-2">
          Start Your 30-Day Pilot
        </button>
      </div>
    </header>
  );
};

const NavLink = ({
  link,
  isPastHero,
}: {
  link: { href: string; label: string };
  isPastHero: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={link.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col overflow-hidden h-5 items-center justify-center group "
    >
      <motion.span
        animate={{ y: isHovered ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "text-sm font-medium whitespace-nowrap transition-colors duration-300",
          isPastHero ? "text-muted-foreground" : "text-white/75",
        )}
      >
        {link.label}
      </motion.span>

      <motion.span
        animate={{ y: isHovered ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "text-sm font-semibold whitespace-nowrap absolute top-full transition-colors duration-300",
          isPastHero ? "text-primary-gradient" : "text-white",
        )}
      >
        {link.label}
      </motion.span>
    </a>
  );
};

export default Navbar;
