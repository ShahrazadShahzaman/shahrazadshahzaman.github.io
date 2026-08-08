import { motion } from "framer-motion";

function RobotRing() {
  return (
    <motion.div
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute h-[460px] w-[460px] rounded-full border border-cyan-400/20"
    >
      {/* Top */}
      <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]" />

      {/* Right */}
      <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]" />

      {/* Bottom */}
      <div className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]" />

      {/* Left */}
      <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]" />
    </motion.div>
  );
}

export default RobotRing;