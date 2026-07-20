import React from 'react';
import { CheckCircle2 } from 'lucide-react'; // Using Lucide for the checkmark icon

function WhyChooseHub() {
  // Data for the list items
  const features = [
    'GPS-based real-time search',
    'Verified and trusted providers',
    'Easy booking & management',
    'Ratings & reviews',
    'Secure communication',
    '24/7 support',
  ];

  return (
    <section className="w-full bg-white py-12 md:py-16 px-4">
      {/* Container to match the layout width of other sections */}
      <div className="max-w-7xl mx-auto">
        
        {/*
          The Card Component
          Match the shadow, border, and padding from the mockup.
          The max-w-4xl and mx-auto center the card on large screens.
        */}
        <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1736]">
              Why Choose <span className="font-medium">Hub?</span>
            </h2>
          </div>

          {/* List Container - 2 columns on tablet/desktop, 1 column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                
                {/* Icon Container with Orange Checkmark */}
                <div className="flex-shrink-0">
                  <CheckCircle2 
                    className="w-8 h-8 md:w-10 md:h-10 text-amber-500" 
                    strokeWidth={1.5}
                  />
                </div>
                
                {/* Feature Text */}
                <p className="text-gray-800 text-lg md:text-xl font-medium">
                  {feature}
                </p>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseHub;