import { useState, useEffect } from "react";
import { Theme } from "./types";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SocialProof from "./components/SocialProof";
import WhyOnstaege from "./components/WhyOnstaege";
import AppShowcase from "./components/AppShowcase";
import UseCases from "./components/UseCases";
import HowItWorks from "./components/HowItWorks";
import BusinessImpact from "./components/BusinessImpact";
import NightlifeSection from "./components/NightlifeSection";
import TestimonialSlider from "./components/TestimonialSlider";
import RequestDemoSection from "./components/RequestDemoSection";
import Footer from "./components/Footer";
import AboutPage from "./components/AboutPage";

export default function App() {
  const theme: Theme = "dark";

  const [currentPage, setCurrentPage] = useState<"home" | "about">(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    return (path === "/about" || hash === "#about" || hash === "#/about") ? "about" : "home";
  });

  const navigateTo = (page: "home" | "about") => {
    setCurrentPage(page);
    const path = page === "about" ? "/about" : "/";
    if (window.location.pathname !== path) {
      window.history.pushState({ page }, "", path);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === "/about" || hash === "#about" || hash === "#/about") {
        setCurrentPage("about");
      } else {
        setCurrentPage("home");
      }
    };
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handlePopState);
    };
  }, []);

  // Keep the document element classes synced up
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add("dark");
  }, []);

  // Handle direct scrolling to specific anchor IDs safely
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`min-h-screen relative font-sans transition-colors duration-500 overflow-x-hidden ${
        theme === "dark"
          ? "bg-[#090909] text-white"
          : "bg-[#FAFAFA] text-zinc-900"
      }`}
    >
      {/* Background grids styling for Figma template look */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-30" 
        style={{
          backgroundImage: `radial-gradient(circle at center, rgb(124, 58, 237, 0.08) 1.5px, transparent 1.5px)`,
          backgroundSize: "28px 28px"
        }}
      />

      {/* Synchronized Transparent became Frosted Glass Navigation Bar */}
      <Navbar 
        theme={theme} 
        currentPage={currentPage} 
        onPageChange={navigateTo} 
      />

      {currentPage === "home" ? (
        /* Premium Hero block with dynamic background slides & App mock rotating screens */
        <main className="relative z-10">
          
          {/* Hero Section */}
          <Hero 
            theme={theme} 
            onRequestDemo={() => scrollToSection("contact")} 
          />

          {/* Live Counters Section */}
          <SocialProof theme={theme} />

          {/* Brand narrative Why Onstaege with pulsing coordinates map */}
          <WhyOnstaege theme={theme} />

          {/* Responsive triple-phone screen solutions showcase */}
          <AppShowcase theme={theme} />

          {/* Continuous horizontal usecases slider deck */}
          <UseCases theme={theme} />

          {/* Four step morph flowchart onboarding */}
          <HowItWorks theme={theme} />

          {/* 100x unconstrained secondary attendee financial dashboard modeling */}
          <BusinessImpact theme={theme} />

          {/* Heavy luxury private table / venue request dashboard section */}
          <NightlifeSection 
            theme={theme} 
            onRequestDemo={() => scrollToSection("contact")} 
          />

          {/* Reviews frosted slider review platform */}
          <TestimonialSlider theme={theme} />

          {/* High performance request calendar concierges */}
          <RequestDemoSection theme={theme} />

        </main>
      ) : (
        <AboutPage 
          theme={theme} 
          onRequestDemo={() => {
            navigateTo("home");
            setTimeout(() => {
              const element = document.getElementById("contact");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }, 200);
          }}
          onPageChange={navigateTo}
        />
      )}

      {/* Structured sitemap index and bottom signature values */}
      <Footer theme={theme} onPageChange={navigateTo} />
    </div>
  );
}
