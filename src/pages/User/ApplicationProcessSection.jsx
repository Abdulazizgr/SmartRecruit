import React from 'react';
import {
  CheckCircleIcon,
  UserIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';

const HowItWorksSection = () => {
  return (
    <section
      id="works"
      className="relative bg-[#EBF4F6] py-10 sm:py-16 lg:py-24"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl text-[#071952] font-extrabold mx-auto md:text-6xl lg:text-5xl">
            Our Hiring Process
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-base text-[#071952] leading-relaxed md:text-2xl">
            Discover the simple steps we use to find the best candidates for our
            team.
          </p>
        </div>
        <div className="relative mt-12 lg:mt-20">
          <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28 ">
            <img
              alt="Curved dotted line"
              loading="lazy"
              width="1000"
              height="500"
              decoding="async"
              className="w-full"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
            />
          </div>
          <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#071952] border-2 border-[#37B7C3] rounded-full shadow">
                <CheckCircleIcon className="w-16 text-[#f0f4f8]" />
              </div>
              <h3 className="mt-6 text-xl text-[#071952] font-semibold leading-tight md:mt-10">
                Apply
              </h3>
              <p className="mt-4 text-base text-[#071952] md:text-lg">
                Submit your application through our online portal to get
                started.
              </p>
            </div>
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#071952] border-2 border-[#37B7C3] rounded-full shadow">
                <UserIcon className="w-16 text-[#f0f4f8]" />
              </div>
              <h3 className="mt-6 text-xl text-[#071952] font-semibold leading-tight md:mt-10">
                Interview
              </h3>
              <p className="mt-4 text-base text-[#071952] md:text-lg">
                Engage in a detailed interview to discuss your skills and
                experience.
              </p>
            </div>
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#071952] border-2 border-[#37B7C3] rounded-full shadow">
                <BriefcaseIcon className="w-16 text-[#f0f4f8]" />
              </div>
              <h3 className="mt-6 text-xl text-[#071952] font-semibold leading-tight md:mt-10">
                Get Hired
              </h3>
              <p className="mt-4 text-base text-[#071952] md:text-lg">
                Receive an offer and join our team to start your new career
                journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
