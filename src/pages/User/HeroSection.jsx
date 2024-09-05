import React from "react";

const HeroSection = () => {
  return (
    <>
      <section className="bg-white relative overflow-hidden h-screen w-full">
        <div className="flex relative z-20 items-center overflow-hidden w-full">
          <div className="container mx-auto px-6 flex relative py-16 ">
            <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20 mx-20 mt-12 ">
              <h1 className="font-poppins uppercase text-4xl sm:text-6xl font-black  pb-2 flex flex-col leading-none text-[#2c3e50]">
                Welcome to
                <span className="text-5xl sm:text-5xl pt-6">
                  IE Networks Solution Careers
                </span>
              </h1>
              <p className="text-2xl sm:text-2xl text-[#34495e] mt-6">
                Join our team and help us shape the future. We are looking for
                passionate individuals who are ready to make a difference.
              </p>
              <div className="flex mt-8">
                <a
                  href="#job-listings"
                  className=" uppercase py-2 px-4 rounded-lg bg-[#071952] border-2 border-transparent text-[#EBF4F6] text-md mr-4 hover:bg-[#088395]"
                >
                  Apply Now
                </a>
              </div>
            </div>
            <div className="hidden xl:block sm:w-1/3 xl:w-3/5 relative invert-0 ">
              <img
                src="assets/image_processing20191025-16564-10g5bob-ezgif.com-gif-maker.gif"
                className="w-full h-5/6  m-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
