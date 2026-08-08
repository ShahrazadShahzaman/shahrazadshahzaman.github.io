import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { sanityClient } from "../../library/sanity";
import robot from "../../assets/icons/robot.png";
import AnimatedBackground from "../ui/animatedbg";
import RobotRing from "../ui/robotring";
function Hero() {
    const [hero, setHero] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "hero"][0]`)
      .then((data) => {
        setHero(data);
      })
      .catch((error) => {
        console.error("Sanity hero fetch error:", error);
      });
  }, []);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, {
    stiffness: 80,
    damping: 15,
  });

  const y = useSpring(mouseY, {
    stiffness: 80,
    damping: 15,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    mouseX.set((e.clientX - rect.left - centerX) / 25);
    mouseY.set((e.clientY - rect.top - centerY) / 25);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-slate-950">
      <AnimatedBackground />
      {/* Left Glow */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>

      {/* Right Glow */}
      <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 pt-28 lg:pt-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center min-h-screen">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm text-cyan-300"
          >
           {hero?.badge}
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-5xl lg:text-6xl font-bold leading-tight text-white"
          >
              {hero?.headingLine1}
            <br />
            <span className="text-cyan-400">
                 {hero?.highlight}
            </span>
            <br />
            {hero?.headingLine3}
            <br />
            {hero?.headingLine4}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 max-w-xl text-xl leading-9 text-slate-400"
          >
            {hero?.description}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex flex-wrap gap-5"
          >
            <a
              href="#projects"
              className="rounded-xl bg-cyan-500 px-7 py-4 font-semibold text-slate-950 transition duration-300 hover:bg-cyan-400 hover:scale-105"
            >
              {hero?.projectsButton}
            </a>

            <a
              href="/resume.pdf"
              download
              className="rounded-xl border border-slate-600 px-7 py-4 font-semibold text-white transition duration-300 hover:border-cyan-400 hover:text-cyan-400 hover:scale-105"
            >
              {hero?.resumeButton}
            </a>
          </motion.div>

        </motion.div>

        {/* RIGHT */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >

          <motion.div
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.03, 1],
            }}

            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex h-[430px] w-[430px] items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/5 shadow-[0_0_80px_rgba(34,211,238,0.08)]"
          >
            <RobotRing />
            <motion.div
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="absolute top-16 left-16 h-3 w-3 rounded-full bg-cyan-400 blur-[2px]"
            />

            <motion.div
              animate={{
                y: [0, 18, 0],
                opacity: [1, 0.4, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute bottom-20 right-20 h-2 w-2 rounded-full bg-cyan-300"
            />
            <div className="absolute h-72 w-72 rounded-full bg-cyan-400/20 blur-[120px]" />
            <motion.img
              src={robot}
              alt="AI Robot"
              style={{
                x,
                y,
              }}
              transition={{
                rotate: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                scale: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="relative z-10 w-[320px] select-none drop-shadow-[0_0_60px_rgba(34,211,238,0.5)]"
              animate={{
                rotate: [-2, 2, -2],
                scale: [1, 1.03, 1],

              }} />
            <motion.div
              animate={{
                x: [-8, 8, -8],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="absolute top-1/2 left-10 h-2.5 w-2.5 rounded-full bg-cyan-500"
            />
          </motion.div>

        </motion.div>

      </div>
    </section >
  );
}

export default Hero;