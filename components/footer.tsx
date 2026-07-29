"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { LuFacebook } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa6";
import { FaPinterest, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

const PRODUCT_LINKS = ["Features", "How It Works", "Industries"];
const COMPANY_LINKS = ["Who It's For", "Contact"];
const LEGAL_LINKS = ["Privacy Policy", "Terms of Service", "Disclaimer"];

const SOCIAL_LINKS = [
  { Icon: FaLinkedin, label: "LinkedIn" },
  { Icon: FaYoutube, label: "YouTube" },
  { Icon: FaTwitter, label: "Twitter" },
  { Icon: FaPinterest, label: "Pinterest" },
  { Icon: LuFacebook, label: "Facebook" },
  { Icon: FaInstagram, label: "Instagram" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-linear-to-br from-primary-mid via-[#062654] to-primary-dark px-6 pb-6 pt-10 font-sans text-white/75">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary-light/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-[#1a5fbf]/25 blur-3xl" />

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
              <span className="text-xs text-white/70">+15122344807</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-white/15 bg-white/10 p-2 text-[#93c5fd] backdrop-blur-sm">
                <Mail size={18} />
              </div>
              <span className="text-xs text-white/70">info@fennix.ai</span>
            </div>
          </div>

          <div className="mt-2">
            <p className="mb-3 text-sm font-semibold text-white">Follow us</p>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
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
              <li
                key={link}
                className="cursor-pointer text-white/65 transition-colors hover:text-white"
              >
                {link}
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
              <li
                key={link}
                className="cursor-pointer text-white/65 transition-colors hover:text-white"
              >
                {link}
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
              <li
                key={link}
                className="cursor-pointer text-white/65 transition-colors hover:text-white"
              >
                {link}
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
