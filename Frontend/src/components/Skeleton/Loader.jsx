// Loader.jsx
import { motion } from "framer-motion";

const Loader = ({ size = 50, color = "text-rose-700" }) => {
  return (
    <motion.div
      className="flex  h-screen items-center justify-center w-full " 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <svg
        className={`animate-spin ${color}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={size}
        height={size}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
    </motion.div>
  );
};

export default Loader;
