'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import QuoteSection from '@/components/sections/QuoteSection';

// MONOCODE: Observable Implementation - Main landing page with structured component composition
export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* MONOCODE: Progressive Construction - Header with navigation */}
      <Header />
      
      {/* MONOCODE: Dependency Transparency - Main content area with proper semantics */}
      <main id="main-content" className="flex-1">
        {/* Style Guide: Section composition following PRD specifications */}
        <HeroSection />
        <ServicesSection />
        <QuoteSection />
      </main>
      
      {/* MONOCODE: Observable Implementation - Footer with legal links */}
      <Footer />
    </div>
  );
}
