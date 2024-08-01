import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10 px-5 md:px-20">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-8 md:mb-0">
          <h3 className="text-xl font-bold mb-4">Contact Information</h3>
          <p>Email: lorem@ipsum.com</p>
          <p>Phone: (987) 654-3210</p>
          <p>Address: 456 Elm Street, Metropolis, Imaginaryland</p>
        </div>
        <div className="mb-8 md:mb-0">
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400 transition duration-300">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook.png" alt="Facebook" className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-gray-400 transition duration-300">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/twitter.png" alt="Twitter" className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-gray-400 transition duration-300">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" alt="LinkedIn" className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-gray-400 transition duration-300">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram.png" alt="Instagram" className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-400 transition duration-300">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition duration-300">Terms of Service</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition duration-300">FAQs</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
