import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import axios from "axios";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    resume: "",
    coverLetter: "",
    additionalDocument: "",
    jobPosition: "",
    departmentId: "", // Ensure departmentId is included
  });

  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Fetch departments data from json-server
    axios
      .get("http://localhost:5000/departments")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

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

    const serviceID = "service_rf2nonv";
    const templateID = "template_kntkg2n";
    const userID = "FrC-VSaK5g_MEJ_zu";

    // Find selected department name
    const selectedDepartment = departments.find(
      (dept) => dept.id === formData.departmentId
    );

    const templateParams = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      resume: formData.resume.name,
      coverLetter: formData.coverLetter,
      additionalDocument: formData.additionalDocument.name,
      jobPosition: selectedDepartment
        ? selectedDepartment.name
        : "Not Selected",
    };

    emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then(() => {
        // Add application to json-server
        axios
          .post("http://localhost:5000/applicants", {
            ...formData,
            status: "Pending", // Ensure status is set to 'Pending'
            dateApplied: new Date().toISOString().split("T")[0], // Set dateApplied to current date
          })
          .then(() => {
            alert("Application submitted successfully");
            setLoading(false);

            // Reset form data
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              address: "",
              resume: "",
              coverLetter: "",
              additionalDocument: "",
              jobPosition: "",
              departmentId: "",
            });
          })
          .catch((error) => {
            console.error("Error saving application:", error);
            alert("Error submitting application");
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Error submitting application");
        setLoading(false);
      });
  };

  return (
    <section id="application-form" className="bg-[#F9FAFB] py-12">
      <button
        type="button"
        className="uppercase py-2 px-4 rounded-lg bg-gray-500 border-2 border-transparent text-white text-md ml-4 hover:bg-gray-700"
        onClick={() => (window.location.href = "/")}
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
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                required
              >
                <option value="">Select a position</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
