"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { LuFacebook } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa6";
import { FaPinterest, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

const PRODUCT_LINKS = [
  { label: "Features", href: "/#capabilities" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Industries", href: "/#industries" },
];
const COMPANY_LINKS = [
  { label: "Who It's For", href: "/#who-its-for" },
  { label: "Contact", href: "/contact" },
];
const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const SOCIAL_LINKS = [
  {
    Icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/fennix-softwaresolutions/",
  },
  {
    Icon: FaYoutube,
    label: "YouTube",
    href: "https://www.youtube.com/@Fennix.a",
  },
  { Icon: FaTwitter, label: "Twitter", href: "https://x.com/AiFennix" },
  {
    Icon: FaPinterest,
    label: "Pinterest",
    href: "https://www.pinterest.com/fennixai/",
  },
  {
    Icon: LuFacebook,
    label: "Facebook",
    href: "https://www.facebook.com/Fennixai/",
  },
  {
    Icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/fennix_ai/",
  },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden px-6 pb-6 pt-10 font-sans text-white/75">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(145deg, #0d2f54 0%, #0a2745 45%, #061b31 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(42,122,232,0.45) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-52 w-52 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(143,184,245,0.35) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-10">
        <div className="flex flex-col gap-4 md:col-span-4">
          <Image
            src="/images/Fennix-BLACK.png"
            alt="Fennix"
            width={100}
            height={100}
            className="brightness-0 invert"
          />

          <p className="max-w-xs text-sm leading-relaxed text-white/70">
            Real-time intelligence platform that helps businesses make smarter,
            data-driven decisions.
          </p>

          <div className="space-y-1.5">
            <div className="flex items-start gap-3">
              <div className="rounded-lg border border-white/15 bg-white/10 p-2 text-[#93c5fd] backdrop-blur-sm">
                <MapPin size={18} />
              </div>
              <span className="mt-1 text-xs leading-relaxed text-white/70">
                30 N Gould St Ste R, Sheridan, WY 82801 Wyoming United States
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-white/15 bg-white/10 p-2 text-[#93c5fd] backdrop-blur-sm">
                <Phone size={18} />
              </div>
              <a
                href="tel:+15122344807"
                className="cursor-pointer text-xs text-white/70 transition-colors hover:text-white hover:underline"
              >
                +15122344807
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-white/15 bg-white/10 p-2 text-[#93c5fd] backdrop-blur-sm">
                <Mail size={18} />
              </div>
              <a
                href="mailto:info@fennix.ai"
                className="cursor-pointer text-xs text-white/70 transition-colors hover:text-white hover:underline"
              >
                info@fennix.ai
              </a>
            </div>
          </div>

          <div className="mt-2">
            <p className="mb-3 text-sm font-semibold text-white">Follow us</p>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map(({ Icon, label, href }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  onClick={() => window.open(href, "_blank")}
                  className="cursor-pointer rounded-lg border border-white/15 bg-white/10 p-2 text-white/80 backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/20 hover:text-white"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="mb-6 text-sm font-semibold tracking-wide text-white">
            Product
          </h3>
          <ul className="space-y-3 text-sm">
            {PRODUCT_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-white/65 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="mb-6 text-sm font-semibold tracking-wide text-white">
            Company
          </h3>
          <ul className="space-y-3 text-sm">
            {COMPANY_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-white/65 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="mb-6 text-sm font-semibold tracking-wide text-white">
            Legal
          </h3>
          <ul className="space-y-3 text-sm">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-white/65 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative mx-auto mt-6 max-w-7xl border-t border-white/15 pt-4">
        <p className="text-center text-xs text-white/50">
          © {new Date().getFullYear()} Fennix.ai. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
