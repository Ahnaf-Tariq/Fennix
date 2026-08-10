"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function Slider() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.set(section, { opacity: 0, y: 32 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 92%",
      end: "top 72%",
      scrub: 0.5,
      onUpdate: (self) => {
        gsap.set(section, {
          opacity: self.progress,
          y: 32 * (1 - self.progress),
        });
      },
    });

    return () => trigger.kill();
  }, []);

  const SliderData = [
    {
      label: "MySQL",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    },
    {
      label: "PostgreSQL",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    {
      label: "SQL Server",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
    },
    {
      label: "Oracle",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
    },
    {
      label: "MariaDB",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg",
    },
    {
      label: "MongoDB",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      label: "Firebase",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    },
    {
      label: "Supabase",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    },
  ];

  const loopSet = [...SliderData, ...SliderData, ...SliderData, ...SliderData];
  const forwardTrackData = [...loopSet, ...loopSet];
  const backwardTrackData = [...SliderData].reverse();
  const backwardLoopSet = [
    ...backwardTrackData,
    ...backwardTrackData,
    ...backwardTrackData,
    ...backwardTrackData,
  ];
  const backwardLoopData = [...backwardLoopSet, ...backwardLoopSet];

  return (
    <>
      <div
        className="h-12 bg-linear-to-b from-[#0a2340] via-[#2f5681]/65 via-55% to-[#f8f9fa]"
        aria-hidden
      />
      <section
        ref={sectionRef}
        id="logo-slider"
        className="relative mb-8 overflow-hidden bg-[#f8f9fa] py-6"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-[#f8f9fa] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-[#f8f9fa] to-transparent" />

        <div className="space-y-4">
          <motion.div
            className="flex w-max items-center gap-0.5"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: 100,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {forwardTrackData.map((item, i) => (
              <SliderItem key={`forward-${item.label}-${i}`} item={item} />
            ))}
          </motion.div>

          <motion.div
            className="flex w-max items-center gap-0.5"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 100,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {backwardLoopData.map((item, i) => (
              <SliderItem key={`backward-${item.label}-${i}`} item={item} />
            ))}
          </motion.div>

          <motion.div
            className="flex w-max items-center gap-0.5"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: 100,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {forwardTrackData.map((item, i) => (
              <SliderItem key={`forward-two-${item.label}-${i}`} item={item} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

function SliderItem({ item }: { item: { label: string; logo: string } }) {
  return (
    <div className="flex min-w-10 cursor-default items-center justify-center gap-2 px-5 py-2.5">
      <img
        src={item.logo}
        alt={item.label}
        className="h-7 w-auto object-contain"
      />
      <span className="whitespace-nowrap text-base font-semibold text-[#7f8da5]">
        {item.label}
      </span>
    </div>
  );
}
