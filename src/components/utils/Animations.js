import React from "react";
import { motion } from "framer-motion";
const variants = {
  hidden: { opacity: 0, y: 200 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 200 },
};

export const FadeInAnimation = ({ children, transition = 1 }) => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: transition,
        x: { duration: transition },
        type: "linear",
      }}
    >
      {children}
    </motion.main>
  );
};

export const FadeInUpAnimation = ({ children, transition = 0.5, key }) => {
  return (
    <motion.main
      key={key}
      variants={variants} // Pass the variant object into Framer Motion
      initial="hidden" // Set the initial state to variants.hidden
      whileInView="enter" // Animated state to variants.enter
      viewport={{ once: true }}
      transition={{
        delay: transition,
        x: { duration: transition },
        type: "linear",
      }}
    >
      {children}
    </motion.main>
  );
};
