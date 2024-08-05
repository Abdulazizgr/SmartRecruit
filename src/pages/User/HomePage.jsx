import React from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ApplicationProcessSection from './ApplicationProcessSection';
import JobListingsSection from './JobListingsSection';
import BenefitsSection from './BenefitsSection';
import Footer from './Footer';
import Navbar from './Navbar';
import JobDetailsPage from './JobDetailsPage';
import ApplicationForm from './ApplicationForm';

const HomePage = () => {
  return (
    <>
      <Navbar/>
      <HeroSection />
      <AboutSection />
      <ApplicationProcessSection />
      <JobListingsSection />
      <BenefitsSection />
      <JobDetailsPage />
      < ApplicationForm />
      <Footer />
    </>
  );
};

export default HomePage;
