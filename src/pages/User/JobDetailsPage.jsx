import React from 'react';
import { Link } from 'react-router-dom';

const JobDetailsPage = () => {
  const job = {
    title: 'Remote React/Node Developer Jobs at U.S. Companies',
    department: 'Engineering',
    location: 'Remote',
    description:
      'At Turing, we are looking for a full-stack developer specializing in React and Node.js who will be responsible for the entire web development process to deliver highly scalable, customer-centric, and performant web applications for our U.S.-based customers.',
    responsibilities: [
      'Design and build scalable APIs',
      'Write clean, efficient, and reusable code',
      'Develop highly efficient user interface components',
      'Analyze website performance and drive improvements',
      'Develop security protocol, data protection, and storage solutions',
      'Collaborate with cross-functional team members to design, develop, review and test applications',
      'Stay updated with emerging technologies and apply them to the operational activities in the organization',
    ],
    requirements: [
      'Bachelor’s/Master’s degree in Computer Science (or equivalent experience)',
      '3+ years of experience in web development (rare exceptions for super-efficient devs)',
      'Proficiency in React.js, Node.js, JavaScript, HTML, JSON, and CSS',
      'Experience with REST APIs and third-party libraries',
      'Knowledge of Node.js frameworks, including Express, StrongLoop, etc.',
      'Fluency in English and the communication skills to effortlessly collaborate with engineering managers at U.S. software companies',
      'The ability to work full-time (40 hours/week) concurrently with U.S. time zones for a minimum of 4 hours/day',
    ],
    preferredSkills: [
      'Experience in cross-browser compatibility, and the responsive design of applications',
      'Proficiency in code versioning tools, such as Git',
      'Expert understanding of server-side logic and front-end performance optimization',
      'Working experience with automated testing tools, like Detox, Jest, Mocha, etc.',
      'Experience working with JavaScript frameworks, like Angular, Vue, etc.',
      'Experience in Unix/Linux environments, including basic commands and scripting',
      'Comfortable with SCRUM and Agile development methodologies',
    ],
  };

  return (
    <>
      <section id="job" className="bg-[#F9FAFB] py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#071952] mb-8">
            {job.title}
          </h2>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[#071952] mb-2">
                Department
              </h3>
              <p className="text-gray-600">{job.department}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[#071952] mb-2">
                Location
              </h3>
              <p className="text-gray-600">{job.location}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[#071952] mb-2">
                Job Description
              </h3>
              <p className="text-gray-600">{job.description}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[#071952] mb-2">
                Job Responsibilities
              </h3>
              <ul className="list-disc pl-5 text-gray-600">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[#071952] mb-2">
                Minimum Requirements
              </h3>
              <ul className="list-disc pl-5 text-gray-600">
                {job.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[#071952] mb-2">
                Preferred Skills
              </h3>
              <ul className="list-disc pl-5 text-gray-600">
                {job.preferredSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <Link
                to={`/application-form`}
                className="uppercase py-2 px-4 rounded-lg bg-[#071952] border-2 border-transparent text-[#EBF4F6] text-md mr-4 hover:bg-[#088395] scroll-smooth"
              >
                Apply
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobDetailsPage;
