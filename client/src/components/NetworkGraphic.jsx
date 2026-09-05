import { motion } from 'framer-motion';

function NetworkGraphic() {
  const nodes = [
    {
      name: 'Alex',
      initials: 'AM',
      position: 'left-[12%] top-[28%]',
      color: 'from-blue-100 to-cyan-100',
      delay: 0,
    },
    {
      name: 'Sarah',
      initials: 'SW',
      position: 'right-[14%] top-[20%]',
      color: 'from-emerald-100 to-cyan-100',
      delay: 0.2,
    },
    {
      name: 'Yves',
      initials: 'YS',
      position: 'left-[22%] bottom-[18%]',
      color: 'from-orange-100 to-rose-100',
      delay: 0.4,
    },
    {
      name: 'Haland',
      initials: 'H',
      position: 'right-[18%] bottom-[22%]',
      color: 'from-cyan-100 to-blue-100',
      delay: 0.6,
    },
  ];

  return (
    <div className="relative h-[360px] overflow-hidden rounded-3xl border border-white/60 bg-white/45 p-6 shadow-[0_12px_40px_rgba(31,38,135,0.08)] backdrop-blur-2xl">
      
      {/* Header */}
      <div className="relative z-20">
        <p className="text-sm font-medium text-[#6e6e73]">
          Your Network
        </p>

        <p className="mt-1 text-lg font-semibold tracking-tight text-[#1d1d1f]">
          Stay connected
        </p>
      </div>

      {/* Decorative glow */}
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/20 blur-3xl" />

      {/* Connection lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M50 52 L17 32"
          fill="none"
          stroke="rgba(80,120,180,0.18)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2 }}
        />

        <motion.path
          d="M50 52 L83 25"
          fill="none"
          stroke="rgba(80,120,180,0.18)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.15 }}
        />

        <motion.path
          d="M50 52 L25 79"
          fill="none"
          stroke="rgba(80,120,180,0.18)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />

        <motion.path
          d="M50 52 L82 76"
          fill="none"
          stroke="rgba(80,120,180,0.18)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.45 }}
        />
      </svg>

      {/* Center node */}
      <motion.div
        animate={{
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-1/2 top-[52%] z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/80 bg-white/75 shadow-[0_8px_30px_rgba(31,38,135,0.12)] backdrop-blur-xl"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1d1d1f] text-sm font-semibold text-white">
          C
        </div>
      </motion.div>

      {/* Contact nodes */}
      {nodes.map((node) => (
        <motion.div
          key={node.name}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -5, 0],
          }}
          transition={{
            opacity: { duration: 0.5, delay: node.delay },
            scale: { duration: 0.5, delay: node.delay },
            y: {
              duration: 3 + node.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          className={`absolute ${node.position} z-10`}
        >
          <div className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/65 px-3 py-2 shadow-[0_8px_25px_rgba(31,38,135,0.08)] backdrop-blur-xl">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${node.color} text-xs font-semibold text-[#315b91]`}
            >
              {node.initials}
            </div>

            <span className="text-xs font-medium text-[#1d1d1f]">
              {node.name}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default NetworkGraphic;