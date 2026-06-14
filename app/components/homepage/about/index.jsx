// @flow strict

import { personalData } from "@/utils/data/personal-data";



function AboutSection() {
  return (
    <div id="about" className="my-12 lg:my-16 relative">
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          GIỚI THIỆU
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div className="order-2 lg:order-1">
          <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
            Tôi là ai?
          </p>
          <p className="text-gray-200 text-sm lg:text-lg">
            {personalData.description}
          </p>
        </div>
        <div className="flex justify-center order-1 lg:order-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={personalData.profile}
            width={280}
            height={280}
            loading="lazy"
            decoding="async"
            alt={personalData.name}
            className="rounded-lg transition-all duration-1000 hover:grayscale-0 hover:scale-110 cursor-pointer w-[280px] h-[280px] max-w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;