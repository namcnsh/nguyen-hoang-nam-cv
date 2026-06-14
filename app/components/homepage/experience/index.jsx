// @flow strict

import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import experience from '../../../assets/lottie/code.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";

function Experience() {
  return (
    <div id="experience" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
        loading="lazy"
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Kinh nghiệm
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8 flex flex-col items-center justify-center">
        <div className="flex justify-center items-center w-full max-w-[600px] aspect-[4/3] mb-8">
          <AnimationLottie animationPath={experience} width="100%" height="100%" />
        </div>

        <div className="w-full max-w-3xl">
          <div className="flex flex-col gap-6">
            {
              experiences.map(experience => (
                <GlowCard key={experience.id} identifier={`experience-${experience.id}`}>
                  <div className="p-3 relative">
                    <Image
                      src="/blur-23.svg"
                      alt="Hero"
                      width={1080}
                      height={200}
                      className="absolute bottom-0 opacity-80"
                    />
                    <div className="flex justify-center">
                      <p className="text-xs sm:text-sm text-[#16f2b3]">
                        {experience.duration}
                      </p>
                    </div>
                    <div className="flex items-start gap-x-8 px-3 py-5">
                      <div className="text-violet-500 transition-all duration-300 hover:scale-125 mt-1">
                        <BsPersonWorkspace size={36} />
                      </div>
                      <div className="w-full">
                        <p className="text-base sm:text-xl mb-2 font-medium uppercase text-white">
                          {experience.title}
                        </p>
                        <p className="text-sm sm:text-base text-gray-300 mb-4">
                          {experience.company}
                        </p>
                        {experience.details && (
                          <ul className="list-disc list-outside text-xs sm:text-sm text-gray-400 space-y-1.5 pl-5">
                            {experience.details.map((detail, index) => (
                              <li key={index} className="text-left leading-relaxed">
                                {detail}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </GlowCard>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;