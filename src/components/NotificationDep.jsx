import React, { useEffect } from 'react';

const NotificationDep = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeStyles = {
    success: 'bg-green-500',
    update: 'bg-blue-500',
    delete: 'bg-red-500',
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white 
      ${typeStyles[type]} 
      animate-fadeIn transition-transform transform hover:scale-105 hover:bg-opacity-90`}
      style={{
        animation: 'fadeIn 0.5s ease-out, fadeOut 0.5s 2.5s ease-in forwards',
        backdropFilter: 'blur(5px)',
      }}
    >
      {message}
    </div>
  );
};

export default NotificationDep;
