import React from 'react';
import {
  GlobeAltIcon,
  CodeBracketIcon,
  ServerIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';

const BenefitsSection = () => {
  return (
    <section className="bg-[#F9FAFB] py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#071952] mb-8">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <CodeBracketIcon className="w-12 h-12 text-[#37B7C3]" />
            </div>
            <h3 className="text-xl font-semibold text-[#071952] mb-2">
              Cutting-Edge Tools
            </h3>
            <p className="text-gray-600">
              Access to the latest software and hardware to stay ahead in
              technology.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <ServerIcon className="w-12 h-12 text-[#37B7C3]" />
            </div>
            <h3 className="text-xl font-semibold text-[#071952] mb-2">
              Scalable Infrastructure
            </h3>
            <p className="text-gray-600">
              Robust and scalable infrastructure to support innovative projects.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <LightBulbIcon className="w-12 h-12 text-[#37B7C3]" />
            </div>
            <h3 className="text-xl font-semibold text-[#071952] mb-2">
              Innovation Encouraged
            </h3>
            <p className="text-gray-600">
              A culture that fosters creativity and new ideas in technology.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <GlobeAltIcon className="w-12 h-12 text-[#37B7C3]" />
            </div>
            <h3 className="text-xl font-semibold text-[#071952] mb-2">
              Global Collaboration
            </h3>
            <p className="text-gray-600">
              Opportunities to work with international teams and clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
