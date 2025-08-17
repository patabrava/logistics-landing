'use client';

import React from 'react';
import HeroSection from '../../components/sections/HeroSection';
import ServicesSection from '../../components/sections/ServicesSection';
import QuoteSection from '../../components/sections/QuoteSection';

export default function TestSections() {
  // MONOCODE Progressive Construction: Service selection handler
  const handleServiceSelect = React.useCallback((serviceId: string) => {
    console.log('Service selected:', serviceId);
  }, []);

  // MONOCODE Progressive Construction: Quote CTA handler
  const handleQuoteClick = React.useCallback(() => {
    console.log('Quote button clicked');
  }, []);

  return (
    <div className="min-h-screen">
      {/* Phase 10 Section Components Test */}
      
      {/* HeroSection */}
      <HeroSection 
        variant="default"
        onQuoteClick={handleQuoteClick}
      />
      
      {/* ServicesSection */}
      <ServicesSection 
        variant="default"
        onServiceSelect={handleServiceSelect}
      />
      
      {/* QuoteSection */}
      <QuoteSection variant="default" />
      
      {/* Test variants */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Component Variants</h2>
          
          <div className="space-y-8">
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-xl font-semibold mb-4">HeroSection Variants</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Default: Orange gradient background with full content</li>
                <li>Minimal: Clean background with essential content</li>
                <li>Image-background: Blue gradient for image overlay</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-xl font-semibold mb-4">ServicesSection Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>5 service cards with icons and features</li>
                <li>Emphasized variant for warehousing service</li>
                <li>Service selection with quote preselection</li>
                <li>Responsive grid layout</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-xl font-semibold mb-4">QuoteSection Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Comprehensive form with validation</li>
                <li>Mailto integration with fallback</li>
                <li>Service preselection from URL params</li>
                <li>Progressive form enhancement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
