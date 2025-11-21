import React, { useEffect, useRef } from 'react';
import { Tool } from '@/data/tools';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Info, Star, Users } from 'lucide-react';

interface UsageInstructionsProps {
  tool: Tool;
}

const UsageInstructions: React.FC<UsageInstructionsProps> = ({ tool }) => {
  const bannerAdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bannerAdRef.current && !bannerAdRef.current.hasChildNodes()) {
      const script1 = document.createElement('script');
      script1.type = 'text/javascript';
      script1.text = `
        atOptions = {
          'key' : '03b1f985f11c01d3739b6616d0f7ac67',
          'format' : 'iframe',
          'height' : 250,
          'width' : 300,
          'params' : {}
        };
      `;
      
      const script2 = document.createElement('script');
      script2.type = 'text/javascript';
      script2.src = '//www.highperformanceformat.com/03b1f985f11c01d3739b6616d0f7ac67/invoke.js';
      
      bannerAdRef.current.appendChild(script1);
      bannerAdRef.current.appendChild(script2);
    }
  }, []);

  const getInstructions = (toolId: string) => {
    const instructionsMap: Record<string, {
      steps: string[];
      tips: string[];
      features: string[];
      benefits: string[];
    }> = {
      "calculator": {
        steps: [
          "Click numbers and operators (+, -, ×, ÷) on the calculator screen",
          "Press = button to complete calculation",
          "Use C button to clear for next calculation",
          "Use . (dot) for decimal numbers",
          "Use scientific functions: sin, cos, tan, ln, log, √, x², x!, π, e",
          "Toggle DEG/RAD for angle mode and INV for inverse functions"
        ],
        tips: [
          "Use keyboard shortcuts for faster calculations",
          "Switch between DEG and RAD modes for trigonometric functions",
          "Use INV button to access inverse trigonometric functions",
          "Use parentheses for complex expressions",
          "π and e constants are available for mathematical calculations"
        ],
        features: [
          "Basic arithmetic operations",
          "Scientific functions (sin, cos, tan, log, ln)",
          "Square root and power functions",
          "Factorial calculation",
          "Constants (π, e)",
          "Degree/Radian mode",
          "Inverse functions",
          "Decimal calculation support",
          "Responsive design"
        ],
        benefits: [
          "Fast and accurate calculations",
          "No installation required",
          "Works on all devices",
          "Free to use",
          "Scientific calculator capabilities",
          "Perfect for students and professionals"
        ]
      },
      "percentage-calculator": {
        steps: [
          "Enter the base number",
          "Enter the percentage value",
          "Click 'Calculate' button",
          "View results and copy if needed"
        ],
        tips: [
          "Use original price and discount percentage for discount calculation",
          "Use old value and increase percentage for growth calculation",
          "Use cost price and markup percentage for markup calculation"
        ],
        features: [
          "Percentage calculation",
          "Discount calculation",
          "Increase/decrease calculation",
          "Instant results"
        ],
        benefits: [
          "Easy percentage calculation",
          "Business calculation helper",
          "Useful for students",
          "Time saving"
        ]
      },
      "gst-calculator": {
        steps: [
          "Enter the product amount",
          "Select GST rate (5%, 12%, 18%, 28%)",
          "Choose Including/Excluding GST option",
          "Click 'Calculate GST' button"
        ],
        tips: [
          "CGST = SGST = GST Rate ÷ 2 (within same state)",
          "IGST = Full GST Rate (inter-state)",
          "Selling price = Base price + GST",
          "Choose correct GST rate"
        ],
        features: [
          "CGST, SGST, IGST calculation",
          "All GST rates support",
          "Including/Excluding option",
          "Detailed breakdown"
        ],
        benefits: [
          "Simplifies GST calculation",
          "Essential for businesses",
          "Reduces errors",
          "Quick calculation"
        ]
      },
      "emi-calculator": {
        steps: [
          "Enter loan amount",
          "Enter annual interest rate",
          "Enter loan tenure in years",
          "Click 'Calculate EMI' button"
        ],
        tips: [
          "Increase loan tenure for lower EMI",
          "Reduce tenure to minimize total interest",
          "Compare different options",
          "Consider prepayment benefits"
        ],
        features: [
          "Monthly EMI calculation",
          "Total interest calculation",
          "Amortization schedule",
          "Graphical representation"
        ],
        benefits: [
          "Loan planning assistance",
          "Budget planning help",
          "Compare different options",
          "Financial decision support"
        ]
      },
      "age-calculator": {
        steps: [
          "Select your birth date",
          "Select calculation date (optional)",
          "Click 'Calculate Age' button",
          "View detailed age (years, months, days)"
        ],
        tips: [
          "Change current date to know age on future dates",
          "Provide accurate birth date for precise results",
          "See countdown to next birthday"
        ],
        features: [
          "Precise age calculation",
          "Years, months, days breakdown",
          "Next birthday countdown",
          "Instant results"
        ],
        benefits: [
          "Know exact age",
          "Document filling assistance",
          "Birthday tracking",
          "Simple interface"
        ]
      },
      "date-difference": {
        steps: [
          "Select first date (From Date)",
          "Select second date (To Date)",
          "Click 'Calculate Difference' button",
          "View difference (days, weeks, months, years)"
        ],
        tips: [
          "Use for event planning",
          "Calculate project timeline",
          "Count vacation days",
          "Calculate working days"
        ],
        features: [
          "Date difference calculation",
          "Days, weeks, months counting",
          "Working days calculation",
          "Calendar view"
        ],
        benefits: [
          "Project planning assistance",
          "Event organizing",
          "Vacation planning",
          "Time management"
        ]
      },
      "profit-loss": {
        steps: [
          "Enter cost price",
          "Enter selling price",
          "Click 'Calculate' button",
          "View profit/loss and percentage"
        ],
        tips: [
          "Add all costs (transport, tax) to cost price",
          "Check market rates before setting selling price",
          "Analyze profit percentage",
          "Compare with competitor prices"
        ],
        features: [
          "Profit-loss calculation",
          "Percentage calculation",
          "Profit margin",
          "Detailed analysis"
        ],
        benefits: [
          "Business decision support",
          "Pricing assistance",
          "Profitability analysis",
          "Budget planning"
        ]
      },
      "area-calculator": {
        steps: [
          "Choose shape (Rectangle, Circle, Triangle)",
          "Enter required dimensions",
          "Select unit",
          "Click 'Calculate Area' button"
        ],
        tips: [
          "Ensure accurate measurements",
          "Use same unit for all measurements",
          "Break complex shapes into smaller parts",
          "Calculate room size, land area"
        ],
        features: [
          "Multiple shape support",
          "Various units",
          "Visual preview",
          "Formula display"
        ],
        benefits: [
          "Construction work assistance",
          "Land measurement utility",
          "Interior design help",
          "Math education support"
        ]
      },
      "ecommerce-profit": {
        steps: [
          "Enter product cost",
          "Enter selling price",
          "Add additional costs (Shipping, Tax, Fees)",
          "Click 'Calculate Profit' button"
        ],
        tips: [
          "Consider all hidden costs",
          "Add platform fees (Amazon, eBay)",
          "Calculate return and refund costs",
          "Include marketing expenses"
        ],
        features: [
          "E-commerce specific calculation",
          "Platform fees calculation",
          "Shipping cost",
          "Margin analysis"
        ],
        benefits: [
          "Online business optimization",
          "Pricing strategy",
          "Profitability analysis",
          "Cost management"
        ]
      },
      "gmail-generator": {
        steps: [
          "Enter your Gmail address",
          "View dots (.) and plus (+) variations",
          "Copy required variations",
          "Use as different emails on various sites"
        ],
        tips: [
          "All emails will arrive in same Gmail account",
          "Use different alias per site",
          "Use plus sign for filtering",
          "Useful for spam tracking"
        ],
        features: [
          "Dots variation",
          "Plus sign variation",
          "Auto generation",
          "Easy copy function"
        ],
        benefits: [
          "Create multiple accounts",
          "Email organization",
          "Spam tracking",
          "Privacy enhancement"
        ]
      },
      "qr-code-generator": {
        steps: [
          "Enter text/URL for QR code",
          "Customize size and color (optional)",
          "Click 'Generate QR Code' button",
          "Download or share QR code"
        ],
        tips: [
          "Add https:// for URLs",
          "Short text creates better QR codes",
          "Test before printing",
          "Download in high resolution"
        ],
        features: [
          "Text, URL, phone number support",
          "Custom size",
          "Color options",
          "Instant download"
        ],
        benefits: [
          "Quick information sharing",
          "Contactless sharing",
          "Marketing tool",
          "Easy scanning"
        ]
      },
      "password-generator": {
        steps: [
          "Select password length",
          "Choose character types (Uppercase, Lowercase, Numbers, Symbols)",
          "Click 'Generate Password' button",
          "Copy and use secure password"
        ],
        tips: [
          "Use at least 12 characters",
          "Mix all character types",
          "Use different password for each account",
          "Use password manager"
        ],
        features: [
          "Custom length",
          "Character type selection",
          "Multiple generation",
          "Copy function"
        ],
        benefits: [
          "Strong security",
          "Hack prevention",
          "Account protection",
          "Random generation"
        ]
      },
      "image-converter": {
        steps: [
          "Upload image file",
          "Choose output format (JPG, PNG, WebP)",
          "Adjust quality settings",
          "Click 'Convert' button and download"
        ],
        tips: [
          "WebP format is good for smaller size",
          "PNG for transparency",
          "JPG for photographs",
          "Size changes according to quality"
        ],
        features: [
          "Multiple format support",
          "Quality control",
          "Batch conversion",
          "Preview function"
        ],
        benefits: [
          "Web optimization",
          "Storage saving",
          "Cross-platform support",
          "Size reduction"
        ]
      },
      "image-compressor": {
        steps: [
          "Upload image file",
          "Select compression level",
          "Check size in preview",
          "Click 'Compress' button and download"
        ],
        tips: [
          "Keep backup of original",
          "70-80% quality is sufficient for websites",
          "Keep high quality for printing",
          "Compare before-after results"
        ],
        features: [
          "Lossless/lossy compression",
          "Size preview",
          "Quality control",
          "Batch processing"
        ],
        benefits: [
          "Website speed improvement",
          "Storage saving",
          "Reduced loading time",
          "Bandwidth saving"
        ]
      },
      "word-counter": {
        steps: [
          "Paste or type your text in the text box",
          "View real-time word and character count",
          "Check paragraph and sentence count",
          "Edit text as needed"
        ],
        tips: [
          "Maintain optimal word count for SEO",
          "Check social media character limits",
          "Track assignment word limits",
          "Use reading time estimates"
        ],
        features: [
          "Real-time counting",
          "Multiple metrics",
          "Reading time estimate",
          "Character density analysis"
        ],
        benefits: [
          "Content optimization",
          "Writing quality improvement",
          "Platform limit tracking",
          "Productivity enhancement"
        ]
      }
    };
    
    return instructionsMap[toolId] || {
      steps: ["Use the tool"],
      tips: ["Enter correct information"],
      features: ["Basic features"],
      benefits: ["Time saving"]
    };
  };

  const instructions = getInstructions(tool.id);

  return (
    <div className="space-y-6 mt-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Info className="w-6 h-6 text-primary" />
          How to Use
        </h2>
        <p className="text-muted-foreground">
          Follow the guide below to get maximum benefits from {tool.name} tool
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Usage Steps
            </CardTitle>
            <CardDescription>
              Follow the step-by-step guide
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3">
              {instructions.steps.map((step, index) => (
                <li key={index} className="text-sm leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Pro Tips
            </CardTitle>
            <CardDescription>
              For better results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {instructions.tips.map((tip, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-blue-500" />
              Key Features
            </CardTitle>
            <CardDescription>
              Special benefits of this tool
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {instructions.features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              Benefits
            </CardTitle>
            <CardDescription>
              Why use this tool
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {instructions.benefits.map((benefit, index) => (
                <li key={index} className="text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* 300x250 Banner Ad */}
      <div className="flex justify-center my-4">
        <div 
          ref={bannerAdRef}
          style={{ textAlign: 'center', margin: '16px 0' }}
        />
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="font-semibold mb-2">💡 Need Help?</h3>
            <p className="text-sm text-muted-foreground">
              If you have any questions about this tool or face any issues, contact us. 
              We provide 24/7 support.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsageInstructions;