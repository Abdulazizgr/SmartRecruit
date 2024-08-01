import React, { useState } from 'react';

const jobs = [
  {
    title: 'Lorem Ipsum Developer',
    department: 'engineering',
    location: 'New York, NY',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    company: 'LoremCorp',
    salary: '$70K - $110K per year',
    type: 'Full Time',
    skills: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Dolor Sit Marketing Specialist',
    department: 'marketing',
    location: 'San Francisco, CA',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    company: 'DolorInc',
    salary: '$50K - $80K per year',
    type: 'Full Time',
    skills: ['Content Creation', 'SEO', 'Marketing Strategy'],
  },
  {
    title: 'Amet Consectetur Sales Executive',
    department: 'sales',
    location: 'Los Angeles, CA',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    company: 'AmetCo',
    salary: '$60K - $90K per year',
    type: 'Full Time',
    skills: ['Sales Strategy', 'Customer Relations', 'Negotiation'],
  },
];

const OpenPositions = () => {
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const filterJobs = (category) => {
    if (category === 'all') {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter((job) => job.department === category);
      setFilteredJobs(filtered);
    }
  };

  return (
    <section className="py-12 bg-[#d4d6d6]">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#071952]">
          Open Positions
        </h2>
        <div className="flex justify-center mb-8 [#071952]">
          <button
            className="px-4 py-2 mx-2 bg-[#6d7aa5] text-white rounded"
            onClick={() => filterJobs('all')}
          >
            All
          </button>
          <button
            className="px-4 py-2 mx-2 bg-[#071952] text-white rounded"
            onClick={() => filterJobs('engineering')}
          >
            Engineering
          </button>
          <button
            className="px-4 py-2 mx-2 bg-[#071952] text-white rounded"
            onClick={() => filterJobs('marketing')}
          >
            Marketing
          </button>
          <button
            className="px-4 py-2 mx-2 bg-[#071952] text-white rounded"
            onClick={() => filterJobs('sales')}
          >
            Sales
          </button>
        </div>
        <div
          id="job-listings"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-12"
        >
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <div
                key={index}
                className="group bg-[#727681] p-4 transition-all duration-300 hover:rotate-1 lg:p-8 rounded-3xl"
              >
                <div className="mb-3 text-right">
                 
                </div>
                <div className="flex items-center gap-x-2">
                  <img
                    className="aspect-[2/2] w-16"
                    src="public/assets/IElogo.png"
                    alt={job.company}
                  />
                  <div>
                    <h3 className="text-xl font-bold text-[#EBF4F6]">
                      {job.company}
                    </h3>
                    <span className="text-xs text-[#37B7C3]">
                      {job.location}
                    </span>
                  </div>
                </div>
                <div className="my-4">
                  <h3 className="text-2xl font-medium text-[#EBF4F6]">
                    {job.title}
                  </h3>
                  <div className="text-sm font-medium">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="m-1 ml-0 inline-block text-[#088395]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 text-sm text-[#37B7C3]">
                    {job.salary}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#EBF4F6]">
                    {job.type}
                  </span>
                  <a
                    href="#"
                    className="font-medium text-[#088395] transition-all duration-300 group-hover:text-[#088395]/80"
                  >
                    Show Details
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div
              id="no-jobs-card"
              className="group bg-[#071952] p-4 transition-all duration-300 hover:rotate-1 lg:p-8 mx-auto max-w-sm text-center"
            >
              <h3 className="text-2xl font-semibold mb-4 text-[#EBF4F6]">
                No Open Jobs
              </h3>
              <p className="text-[#37B7C3]">
                There are currently no open positions. Please check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OpenPositions;
