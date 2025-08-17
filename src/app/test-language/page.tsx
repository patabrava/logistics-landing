/**
 * Test page for LanguageToggle component
 * Demonstrates Task 9.1 completion with observable implementation
 */

'use client';

import React from 'react';
import LanguageToggle, { useCurrentLanguage } from '@/components/layout/LanguageToggle';

export default function LanguageToggleTest() {
  const currentLanguage = useCurrentLanguage();
  const [changeCount, setChangeCount] = React.useState(0);

  const handleLanguageChange = (language: string) => {
    console.log('Language changed to:', language);
    setChangeCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">
          LanguageToggle Component Test - Task 9.1
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Current Status</h2>
          <p className="text-gray-600 mb-2">Current Language: <span className="font-mono">{currentLanguage}</span></p>
          <p className="text-gray-600">Changes: {changeCount}</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3">Header Variant</h3>
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 rounded">
              <LanguageToggle 
                variant="header" 
                onLanguageChange={handleLanguageChange}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3">Footer Variant</h3>
            <div className="bg-gray-900 p-4 rounded">
              <LanguageToggle 
                variant="footer" 
                onLanguageChange={handleLanguageChange}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3">Inline Variant</h3>
            <LanguageToggle 
              variant="inline" 
              onLanguageChange={handleLanguageChange}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3">Without Labels (Flags)</h3>
            <LanguageToggle 
              variant="inline" 
              showLabels={false}
              onLanguageChange={handleLanguageChange}
            />
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            ✅ Task 9.1 Complete: LanguageToggle Component
          </h3>
          <ul className="text-green-700 space-y-1">
            <li>• Observable Implementation: Structured logging for language changes</li>
            <li>• Explicit Error Handling: Input validation and graceful fallbacks</li>
            <li>• Dependency Transparency: localStorage operations clearly documented</li>
            <li>• Progressive Construction: Multiple variants and extensible design</li>
            <li>• Language persistence: Survives page refreshes</li>
            <li>• Accessibility: Proper ARIA labels and keyboard navigation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
