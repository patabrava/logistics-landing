'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import QuoteSection from '@/components/sections/QuoteSection';

// MONOCODE: Observable Implementation - Main landing page with structured component composition
export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* MONOCODE: Progressive Construction - Header with navigation */}
      <Header />
      
      {/* MONOCODE: Dependency Transparency - Main content area with proper semantics */}
      {/* Offset for fixed Header height to prevent overlap on first section */}
      <main id="main-content" className="flex-1 pt-16 md:pt-20">
        {/* Style Guide: Section composition following PRD specifications */}
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <PartnersSection />
        <QuoteSection />
      </main>
      
      {/* MONOCODE: Observable Implementation - Footer with legal links */}
      <Footer />
    </div>
  );
}
