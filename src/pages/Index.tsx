
import React, { useEffect, useRef } from "react";
import { tools } from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import { motion } from "framer-motion";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const parentVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="space-y-6 sm:space-y-8 w-full">
      <section className="text-center space-y-4 py-4 sm:py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Smart<span className="text-primary">Toolkit</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto px-4">
            A collection of beautifully designed tools to simplify your daily tasks
          </p>
        </motion.div>
      </section>

      <motion.div
        ref={containerRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4"
        variants={parentVariants}
        initial="hidden"
        animate="visible"
      >
        {tools.map((tool) => (
          <motion.div key={tool.id} variants={childVariants}>
            <ToolCard tool={tool} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Index;
