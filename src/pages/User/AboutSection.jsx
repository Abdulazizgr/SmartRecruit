import React from 'react';
import { CheckCircleIcon, StarIcon, LightBulbIcon, UsersIcon } from '@heroicons/react/24/outline';

const AboutSection = () => {
  return (
    <section className="text-gray-700 body-font">
      <div className="flex justify-center mt-10 text-4xl font-regular">Why Choose Us?</div>
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-wrap text-center justify-center">
          <div className="p-4 md:w-1/4 sm:w-1/2">
            <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
              <div className="flex justify-center mb-3">
                <CheckCircleIcon className="w-16 text-gray-900" />
              </div>
              <h2 className="title-font font-regular text-2xl text-gray-900">
                High Quality Service
              </h2>
            </div>
          </div>

          <div className="p-4 md:w-1/4 sm:w-1/2">
            <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
              <div className="flex justify-center mb-3">
                <StarIcon className="w-16 text-gray-900" />
              </div>
              <h2 className="title-font font-regular text-2xl text-gray-900">
                Customer Satisfaction
              </h2>
            </div>
          </div>

          <div className="p-4 md:w-1/4 sm:w-1/2">
            <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
              <div className="flex justify-center mb-3">
                <LightBulbIcon className="w-16 text-gray-900" />
              </div>
              <h2 className="title-font font-regular text-2xl text-gray-900">
                Innovative Solutions
              </h2>
            </div>
          </div>

          <div className="p-4 md:w-1/4 sm:w-1/2">
            <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
              <div className="flex justify-center mb-3">
                <UsersIcon className="w-16 text-gray-900" />
              </div>
              <h2 className="title-font font-regular text-2xl text-gray-900">
                Experienced Team
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
