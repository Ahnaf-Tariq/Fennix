"use client";
import React from "react";
import {
  Factory,
  ShoppingCart,
  Truck,
  HeartPulse,
  Cpu,
  ArrowRight,
} from "lucide-react";

const IndustriesWeServe = () => {
  const industries = [
    {
      title: "Manufacturing",
      description: "Optimizing supply chains and production floor efficiency.",
      icon: <Factory size={22} className="text-primary" />,
    },
    {
      title: "Retail & E-commerce",
      description: "Predicting demand and personalizing customer experiences.",
      icon: <ShoppingCart size={22} className="text-primary" />,
    },
    {
      title: "Logistics",
      description: "Real-time route optimization and fleet management.",
      icon: <Truck size={22} className="text-primary" />,
    },
    {
      title: "Healthcare",
      description: "Enhancing patient outcomes with data-driven diagnostics.",
      icon: <HeartPulse size={22} className="text-primary" />,
    },
    {
      title: "Technology",
      description:
        "Scaling infrastructure with automated decision intelligence.",
      icon: <Cpu size={22} className="text-primary" />,
    },
  ];

  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
          <div className="flex-1 w-full lg:w-1/2">
            <div className="flex flex-row items-center w-full gap-4 md:gap-6">
              <div className="flex-1 flex flex-col gap-4 md:gap-6">
                {industries.slice(0, 3).map((industry, index) => (
                  <IndustryCard key={index} {...industry} />
                ))}
              </div>

              <div className="flex-1 flex flex-col gap-4 md:gap-6">
                {industries.slice(3, 5).map((industry, index) => (
                  <IndustryCard key={index} {...industry} />
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left lg:pl-16">
            <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 leading-tight tracking-tight">
              Industries We <span className="text-primary-gradient">Serve</span>
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
              Fennix provides tailored decision intelligence across diverse
              sectors, turning complex industry data into actionable growth
              strategies.
            </p>
            <div className="pt-4">
              <button className="btn-primary px-8 py-3.5 flex items-center gap-2 group mx-auto lg:mx-0">
                Start Your 30-Day Pilot
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const IndustryCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="p-6 rounded-2xl bg-blue-50/40 border border-blue-100/50 flex flex-col items-center text-center transition-all duration-300 hover:bg-white hover:shadow-2xl hover:shadow-blue-100 group">
      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm border border-blue-50 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-base font-bold text-zinc-900 mb-2 leading-tight">
        {title}
      </h3>
      <p className="text-zinc-500 text-[11px] sm:text-xs leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default IndustriesWeServe;
