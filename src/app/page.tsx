"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import ProcessFlow from "@/components/ProcessFlow";
import BlueprintsMiniCaseStudies from "@/components/BlueprintsMiniCaseStudies";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServicesOverview />
      <ProcessFlow />
      <BlueprintsMiniCaseStudies />
    </>
  );
}