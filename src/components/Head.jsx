import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import { motion } from "motion/react";
import { Navbar } from "./Navbar";

export default function Head() {
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.3,
      },
    },
  };

  const word = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative bg-[#060707] w-full h-[80vh]">
      <Navbar />

      <div className="items-center bg-[#060707] flex justify-around pt-20 relative flex-wrap px-5">
        <div className="bg-cyan-300 h-[362px] w-[362px] absolute rounded-full blur-[120px] -top-[100px] -left-20 opacity-75"></div>

        <div className="max-w-lg relative">
          <motion.h1
            variants={sentence}
            initial="hidden"
            animate="visible"
            className="font-IBMPlexBold text-6xl max-w-md uppercase flex flex-col gap-3"
          >
            {["Code", "Sphere"].map((text, index) => (
              <motion.span
                key={index}
                variants={word}
                className="block leading-tight"
              >
                {text === "Sphere" ? (
                  <AnimatedGradientText className="uppercase">
                    {text}
                  </AnimatedGradientText>
                ) : (
                  text
                )}
              </motion.span>
            ))}
          </motion.h1>

          <p className="mt-6 font-IBMPlexRegular text-green-100">
           An interactive coding platform with real-time execution, visualization, and competitive analytics
          </p>
        </div>

        <div className="py-6 sm:py-0">
          <img
            className="rounded-full"
            width="450"
            height="450"
            alt="bg-image"
            src="https://png.pngtree.com/thumb_back/fh260/background/20221015/pngtree-abstract-programming-workflow-a-screen-displaying-real-python-code-development-photo-image_28458262.jpg"
          />
        </div>
      </div>
    </div>
  );
}
