import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header/Header";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
    </div>
  );
};

const Success = () => {
  const containerVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.8 },
  };

  const circleVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: { duration: 0.5, delay: 0.3, ease: "easeOut" },
    },
    exit: { scale: 0 },
  };

  const checkVariants = {
    initial: { pathLength: 0 },
    animate: {
      pathLength: 1,
      transition: { duration: 0.5, delay: 0.5 },
    },
    exit: { pathLength: 0 },
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <motion.div
        className="bg-blue-500 rounded-full w-40 h-40 flex items-center justify-center mb-8"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-check"
          variants={checkVariants}
        >
          <polyline points="20 6 9 17 4 12" />
        </motion.svg>
      </motion.div>
      <motion.h5
        className="text-center mb-14 text-[25px] text-[#000000a1]"
        variants={containerVariants}
      >
        Your order is successful 😍
      </motion.h5>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
