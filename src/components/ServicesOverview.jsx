"use client";

import { motion } from "framer-motion";

/**
 * Preview list of core services
 * (limited to first 3 on homepage)
 */
const services = [
  {
    icon: "💻",
    title: "Custom Software Development",
    description:
      "We build scalable web and mobile applications tailored to your business needs — from MVPs to full platforms.",
  },
  {
    icon: "🌐",
    title: "Web & Digital Platforms",
    description:
      "Modern, high-performance websites and platforms designed to convert, scale, and represent your brand globally.",
  },
  {
    icon: "🤖",
    title: "AI & Business Automations",
    description:
      "Smart systems that automate workflows, improve efficiency, and unlock new growth opportunities.",
  },
  {
    icon: "📊",
    title: "Internal Tools & CRMs",
    description:
      "Custom dashboards, CRMs, and internal tools that help teams work faster and smarter.",
  },
  {
    icon: "🔗",
    title: "Integrations & APIs",
    description:
      "We connect systems, services, and data seamlessly using secure and reliable integrations.",
  },
];

export default function ServicesOverview() {
  return (
    <section
      className="w-full bg-white text-black pt-24 pb-14 px-6"
      style={{ fontFamily: "Inter" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-sm uppercase tracking-widest text-gray-500"
        >
          What We Do
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="mt-3 text-3xl md:text-4xl font-medium leading-tight"
        >
          Technology Solutions Built for Growth
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="mt-4 max-w-2xl text-gray-600"
        >
          We partner with startups, businesses, and teams worldwide to design
          and engineer digital solutions that solve real problems and scale with
          confidence.
        </motion.p>

        {/* Services grid (preview only) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.slice(0, 3).map((service, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.995 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:shadow-2xl"
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute -inset-24 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div
                  className="h-full w-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 20%, rgba(59,130,246,0.22), transparent 55%)",
                  }}
                />
              </div>

              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.12, rotate: -2 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="relative z-10 mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white text-xl shadow-sm"
              >
                {service.icon}
              </motion.div>

              {/* Content */}
              <h3 className="relative z-10 text-lg font-medium">
                {service.title}
              </h3>

              <p className="relative z-10 mt-3 text-gray-600 leading-relaxed">
                {service.description}
              </p>

              {/* Bottom row */}
              <div className="relative z-10 mt-7 flex items-center justify-between">
                <div className="h-[2px] w-10 bg-black/20 group-hover:w-16 group-hover:bg-blue-600/80 transition-all duration-300" />

                <a
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 transition-all duration-300 group-hover:text-blue-700"
                >
                  View
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>

              {/* Card accent */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5 group-hover:ring-blue-600/20 transition" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
