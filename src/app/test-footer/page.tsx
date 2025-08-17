'use client';

import React from 'react';
import Footer from '../../components/layout/Footer';

export default function TestFooter() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header space */}
      <div className="h-20 bg-blue-600 flex items-center justify-center text-white">
        <h1 className="text-2xl font-bold">Footer Test Page</h1>
      </div>
      
      {/* Main content */}
      <div className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Footer Component Variants</h2>
          
          <div className="space-y-8">
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-xl font-semibold mb-4">Default Footer</h3>
              <p className="text-gray-600 mb-4">Complete footer with all sections, links, and company information.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-xl font-semibold mb-4">Minimal Footer</h3>
              <p className="text-gray-600 mb-4">Simplified footer with essential links only.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-xl font-semibold mb-4">Expanded Footer</h3>
              <p className="text-gray-600 mb-4">Extended footer with additional spacing and content.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Demo footers */}
      <div className="space-y-8">
        <Footer variant="default" />
        
        <Footer variant="minimal" />
        
        <Footer variant="expanded" />
      </div>
    </div>
  );
}
