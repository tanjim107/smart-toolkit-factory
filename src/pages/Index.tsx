
import React, { useEffect, useRef } from "react";
import { tools } from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import { motion } from "framer-motion";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set homepage SEO
    document.title = 'SmartToolkit - Free Online Calculator & Tool Collection | SEO Optimized';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free online calculator and utility tools. Calculate percentages, EMI, GST, age, profit-loss, area, generate QR codes, passwords, compress images, and more. Fast, accurate, and mobile-friendly tools.');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "SmartToolkit",
      "description": "Free online calculator and utility tools collection",
      "url": "https://smarttoolkit.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://smarttoolkit.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "SmartToolkit"
      },
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": tools.map((tool, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "WebApplication",
            "name": tool.name,
            "description": tool.description,
            "url": `https://smarttoolkit.com${tool.path}`,
            "applicationCategory": "UtilityApplication"
          }
        }))
      }
    };

    let structuredDataScript = document.querySelector('#homepage-structured-data') as HTMLScriptElement;
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'homepage-structured-data';
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);

    return () => {
      // Cleanup when component unmounts
      const script = document.querySelector('#homepage-structured-data');
      if (script) {
        script.remove();
      }
    };
  }, []);

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
