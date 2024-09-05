import React from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import SendIcon from '@mui/icons-material/Send';

export const Frame = () => {
  return (
    <div className="inline-flex items-start gap-6 relative">
      <div className="relative w-[325px] h-[188px] bg-[#1e1e1e] rounded-2xl overflow-hidden">
        <div className="absolute w-[331px] h-[193px] top-[-21px] left-4">
          <div className="h-[193px] absolute w-[331px] top-0 left-0">
            <div className="h-[156px] absolute w-[331px] top-0 left-0">
              <div className="absolute w-[156px] h-[156px] top-0 left-[175px] bg-[#29c5ee26] rounded-[78px] blur-[80px]" />
              <div className="inline-flex items-center gap-3 absolute top-[37px] left-0">
                <img className="relative w-12 h-12 object-cover" alt="Rectangle" src="rectangle-2.png" />
                <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Urbanist-Bold',Helvetica] font-bold text-white text-lg text-center tracking-[0] leading-[normal]">
                    Sr. UX Designer
                  </div>
                  <div className="relative w-fit [font-family:'Urbanist-Medium',Helvetica] font-medium text-[#898989] text-xs text-center tracking-[0] leading-[normal] whitespace-nowrap">
                    Posted 2 days ago
                  </div>
                </div>
              </div>
              <div className="inline-flex items-start gap-2 absolute top-[101px] left-0">
                <div className="inline-flex items-center gap-1 px-3 py-1.5 relative flex-[0_0_auto] bg-[#282828] rounded-3xl">
                  <LocationOnIcon className="!relative !w-4 !h-4" />
                  <div className="relative w-fit [font-family:'Urbanist-Medium',Helvetica] font-medium text-[#898989] text-[13px] text-center tracking-[0] leading-[13px] whitespace-nowrap">
                    Bengaluru
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 relative flex-[0_0_auto] bg-[#282828] rounded-3xl">
                  <SchoolIcon className="!relative !w-4 !h-4" />
                  <div className="relative w-fit [font-family:'Urbanist-Medium',Helvetica] font-medium text-[#898989] text-[13px] text-center tracking-[0] leading-[13px] whitespace-nowrap">
                    3 years exp.
                  </div>
                </div>
              </div>
              <div className="w-12 top-[29px] left-[253px] bg-[#ffffff1a] rounded-3xl backdrop-blur-[100px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(100px)_brightness(100%)] absolute h-12">
                <SendIcon className="!absolute !w-5 !h-5 !top-3.5 !left-3.5" />
              </div>
            </div>
            <div className="w-[119px] top-[145px] left-0 absolute h-12">
              <div className="absolute top-0 left-0 [font-family:'Urbanist-Bold',Helvetica] font-bold text-white text-[40px] tracking-[0] leading-[normal] whitespace-nowrap">
                45
              </div>
              <div className="absolute top-[27px] left-[51px] [font-family:'Urbanist-Regular',Helvetica] font-normal text-[#898989] text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                applications
              </div>
            </div>
          </div>
          <div className="absolute top-[169px] left-[215px] [font-family:'Urbanist-Regular',Helvetica] font-normal text-[#00b85e] text-xs leading-[16.8px] tracking-[0] whitespace-nowrap">
            25 in last week
          </div>
        </div>
        <div className="absolute w-1.5 h-[188px] top-0 left-0 bg-[#29c5ee] rounded-[16px_0px_0px_16px]" />
      </div>

      {/* Similar content for other cards can be added here... */}

    </div>
  );
};
