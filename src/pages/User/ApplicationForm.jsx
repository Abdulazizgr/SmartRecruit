import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    resume: '',
    coverLetter: '',
    additionalDocument: '',
    jobPosition: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceID = 'service_n7zyrza';
    const templateID = 'template_xuuspy6';
    const userID = 'd_Qav9-GzQmZYbbzo';

    const templateParams = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      resume: formData.resume.name,
      coverLetter: formData.coverLetter,
      additionalDocument: formData.additionalDocument.name,
      jobPosition: formData.jobPosition,
    };

    emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        alert('Application submitted successfully');
        setLoading(false);

        // Reset form data
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          address: '',
          resume: '',
          coverLetter: '',
          additionalDocument: '',
          jobPosition: '',
        });
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('Error submitting application');
        setLoading(false);
      });
  };

  return (
    <section id="application-form" className="bg-[#F9FAFB] py-12">
      <button
        type="button"
        className="uppercase py-2 px-4 rounded-lg bg-gray-500 border-2 border-transparent text-white text-md ml-4 hover:bg-gray-700"
        onClick={() => (window.location.href = '/')}
      >
        Back to Home
      </button>
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#071952] mb-8">
          Application Form
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Enter your first name"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Enter your last name"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter your address"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Resume
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="file"
                name="resume"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Cover Letter
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                required
                placeholder="Enter your cover letter"
              ></textarea>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Additional Document (e.g., Certificate)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="file"
                name="additionalDocument"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Job Position
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="jobPosition"
                value={formData.jobPosition}
                onChange={handleChange}
                required
              >
                <option value="">Select a position</option>
                <option value="engineering">Engineering</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
              </select>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="uppercase py-2 px-4 rounded-lg bg-[#071952] border-2 border-transparent text-[#EBF4F6] text-md mr-4 hover:bg-[#088395]"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
