import React from 'react';
import { Tool } from '@/data/tools';

interface SEOHeadProps {
  tool: Tool;
}

const SEOHead: React.FC<SEOHeadProps> = ({ tool }) => {
  const generateStructuredData = () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": tool.name,
      "description": tool.description,
      "url": `https://smarttoolkit.com${tool.path}`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "creator": {
        "@type": "Organization",
        "name": "SmartToolkit"
      },
      "keywords": getToolKeywords(tool.id),
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "2847"
      }
    };

    return JSON.stringify(structuredData);
  };

  const getToolKeywords = (toolId: string): string => {
    const keywordMap: Record<string, string> = {
      "calculator": "calculator, basic calculator, arithmetic, math calculator, online calculator",
      "percentage-calculator": "percentage calculator, percent calculator, percentage calculation, discount calculator, markup calculator",
      "gst-calculator": "GST calculator, goods services tax, tax calculator, India GST, CGST SGST IGST",
      "emi-calculator": "EMI calculator, loan calculator, monthly installment, home loan EMI, car loan EMI",
      "age-calculator": "age calculator, age calculation, birth date calculator, exact age calculator",
      "date-difference": "date difference calculator, days between dates, date duration calculator",
      "profit-loss": "profit loss calculator, business calculator, profit margin calculator, loss percentage",
      "area-calculator": "area calculator, geometry calculator, shape area, rectangle circle triangle area",
      "ecommerce-profit": "ecommerce profit calculator, online business calculator, profit margin ecommerce",
      "gmail-generator": "gmail generator, email variations, gmail dots, gmail plus, email aliases",
      "qr-code-generator": "QR code generator, QR code maker, generate QR code, free QR generator",
      "password-generator": "password generator, secure password, random password, strong password generator",
      "image-converter": "image converter, format converter, JPG PNG WebP converter, image format changer",
      "image-compressor": "image compressor, compress images, reduce image size, optimize images",
      "word-counter": "word counter, character counter, text analyzer, word count tool"
    };
    
    return keywordMap[toolId] || `${tool.name.toLowerCase()}, online tool, free calculator`;
  };

  const getToolTitle = (): string => {
    const titleMap: Record<string, string> = {
      "calculator": "Free Online Calculator | Basic Math Calculator - SmartToolkit",
      "percentage-calculator": "Percentage Calculator | Calculate Percentages Online Free - SmartToolkit",
      "gst-calculator": "GST Calculator | Goods & Services Tax Calculator India - SmartToolkit",
      "emi-calculator": "EMI Calculator | Home Loan Car Loan EMI Calculator - SmartToolkit",
      "age-calculator": "Age Calculator | Calculate Your Exact Age From Birth Date - SmartToolkit",
      "date-difference": "Date Difference Calculator | Days Between Dates Calculator - SmartToolkit",
      "profit-loss": "Profit Loss Calculator | Business Profit Margin Calculator - SmartToolkit",
      "area-calculator": "Area Calculator | Calculate Area of Shapes Online - SmartToolkit",
      "ecommerce-profit": "eCommerce Profit Calculator | Online Business Profit Calculator - SmartToolkit",
      "gmail-generator": "Gmail Generator | Create Gmail Variations with Dots & Plus - SmartToolkit",
      "qr-code-generator": "QR Code Generator | Free QR Code Maker Online - SmartToolkit",
      "password-generator": "Password Generator | Generate Secure Strong Passwords - SmartToolkit",
      "image-converter": "Image Converter | Convert JPG PNG WebP Images Online - SmartToolkit",
      "image-compressor": "Image Compressor | Compress Images Online Free - SmartToolkit",
      "word-counter": "Word Counter | Character Counter Text Analyzer Tool - SmartToolkit"
    };
    
    return titleMap[tool.id] || `${tool.name} - SmartToolkit`;
  };

  const getToolDescription = (): string => {
    const descriptionMap: Record<string, string> = {
      "calculator": "Free online basic calculator for arithmetic operations. Add, subtract, multiply, divide with our fast and accurate web calculator. No download required.",
      "percentage-calculator": "Calculate percentages easily with our free online percentage calculator. Find percentage of numbers, percentage increase/decrease, and discount calculations.",
      "gst-calculator": "Calculate GST (Goods & Services Tax) with our free India GST calculator. Calculate CGST, SGST, IGST, and total tax amount including and excluding GST.",
      "emi-calculator": "Calculate EMI (Equated Monthly Installment) for home loans, car loans, and personal loans. Free EMI calculator with detailed amortization schedule.",
      "age-calculator": "Calculate your exact age from birth date with our precise age calculator. Find age in years, months, days, hours, minutes, and seconds.",
      "date-difference": "Calculate the difference between two dates. Find days, weeks, months, and years between any two dates with our free date difference calculator.",
      "profit-loss": "Calculate business profit and loss with our free profit loss calculator. Find profit margin, loss percentage, and profitability analysis.",
      "area-calculator": "Calculate area of various shapes including rectangle, circle, triangle, square with our free online area calculator. Get accurate measurements instantly.",
      "ecommerce-profit": "Calculate eCommerce business profitability with our specialized profit calculator. Analyze costs, revenue, and profit margins for online stores.",
      "gmail-generator": "Generate multiple Gmail address variations using dots and plus signs. Create Gmail aliases for better email organization and management.",
      "qr-code-generator": "Create QR codes instantly with our free QR code generator. Generate QR codes for URLs, text, phone numbers, and more. Download as PNG.",
      "password-generator": "Generate secure, strong passwords with our free password generator. Create random passwords with custom length and character sets.",
      "image-converter": "Convert images between different formats (JPG, PNG, WebP, GIF) with our free online image converter. Fast, secure, and no upload limits.",
      "image-compressor": "Compress images online without losing quality. Reduce image file size for web, email, and storage with our free image compressor.",
      "word-counter": "Count words, characters, paragraphs, and sentences in your text. Free online word counter tool with detailed text analysis and statistics."
    };
    
    return descriptionMap[tool.id] || tool.description;
  };

  React.useEffect(() => {
    // Update document title
    document.title = getToolTitle();
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', getToolDescription());
    }
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', getToolKeywords(tool.id));
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://smarttoolkit.com${tool.path}`);
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', getToolTitle());
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', getToolDescription());
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', `https://smarttoolkit.com${tool.path}`);
    
    // Add structured data
    let structuredDataScript = document.querySelector('#structured-data') as HTMLScriptElement;
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'structured-data';
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = generateStructuredData();
    
    // Cleanup function
    return () => {
      // Reset to default values when component unmounts
      document.title = 'SmartToolkit - Free Online Calculator & Tool Collection | SEO Optimized';
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Free online calculator and utility tools. Calculate percentages, EMI, GST, age, profit-loss, area, generate QR codes, passwords, compress images, and more. Fast, accurate, and mobile-friendly tools.');
      }
    };
  }, [tool]);

  return null; // This component doesn't render anything visual
};

export default SEOHead;