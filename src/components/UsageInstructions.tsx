import React from 'react';
import { Tool } from '@/data/tools';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Info, Star, Users } from 'lucide-react';

interface UsageInstructionsProps {
  tool: Tool;
}

const UsageInstructions: React.FC<UsageInstructionsProps> = ({ tool }) => {
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
          "মূল সংখ্যা (Base Number) ইনপুট করুন",
          "শতাংশ (Percentage) ইনপুট করুন",
          "'Calculate' বাটনে ক্লিক করুন",
          "ফলাফল দেখুন এবং প্রয়োজনে কপি করুন"
        ],
        tips: [
          "ছাড় হিসাব করতে original price এবং discount percentage ব্যবহার করুন",
          "বৃদ্ধি হিসাব করতে old value এবং increase percentage ব্যবহার করুন",
          "মার্ক আপ হিসাবের জন্য cost price এবং markup percentage ব্যবহার করুন"
        ],
        features: [
          "শতাংশ গণনা",
          "ছাড় হিসাব",
          "বৃদ্ধি/হ্রাস গণনা",
          "তাৎক্ষণিক ফলাফল"
        ],
        benefits: [
          "সহজ শতাংশ গণনা",
          "ব্যবসায়িক হিসাব সহায়ক",
          "শিক্ষার্থীদের জন্য উপযোগী",
          "সময় সাশ্রয়ী"
        ]
      },
      "gst-calculator": {
        steps: [
          "পণ্যের মূল্য (Amount) ইনপুট করুন",
          "GST রেট (5%, 12%, 18%, 28%) সিলেক্ট করুন",
          "Including/Excluding GST অপশন বেছে নিন",
          "'Calculate GST' বাটনে ক্লিক করুন"
        ],
        tips: [
          "CGST = SGST = GST Rate ÷ 2 (একই রাজ্যের মধ্যে)",
          "IGST = Full GST Rate (রাজ্যের বাইরে)",
          "বিক্রয় মূল্য = মূল মূল্য + GST",
          "GST রেট সঠিক করে বেছে নিন"
        ],
        features: [
          "CGST, SGST, IGST গণনা",
          "সব GST রেট সাপোর্ট",
          "Including/Excluding অপশন",
          "বিস্তারিত ব্রেকডাউন"
        ],
        benefits: [
          "GST হিসাব সহজ করে",
          "ব্যবসায়ীদের জন্য প্রয়োজনীয়",
          "ভুল কমায়",
          "দ্রুত গণনা"
        ]
      },
      "emi-calculator": {
        steps: [
          "ঋণের পরিমাণ (Loan Amount) ইনপুট করুন",
          "সুদের হার (Interest Rate) বার্ষিক হিসেবে দিন",
          "ঋণের মেয়াদ (Loan Tenure) বছরে দিন",
          "'Calculate EMI' বাটনে ক্লিক করুন"
        ],
        tips: [
          "কম EMI চাইলে loan tenure বাড়ান",
          "মোট সুদ কমাতে tenure কমান",
          "বিভিন্ন অপশন compare করুন",
          "prepayment এর সুবিধা বিবেচনা করুন"
        ],
        features: [
          "মাসিক EMI গণনা",
          "মোট সুদ হিসাব",
          "Amortization schedule",
          "গ্রাফিক্যাল উপস্থাপনা"
        ],
        benefits: [
          "ঋণ পরিকল্পনা সহায়ক",
          "বাজেট করতে সাহায্য করে",
          "বিভিন্ন অপশন তুলনা",
          "আর্থিক সিদ্ধান্ত সহায়ক"
        ]
      },
      "age-calculator": {
        steps: [
          "আপনার জন্ম তারিখ (Birth Date) সিলেক্ট করুন",
          "গণনার তারিখ (Current Date) সিলেক্ট করুন (অপশনাল)",
          "'Calculate Age' বাটনে ক্লিক করুন",
          "বিস্তারিত বয়স দেখুন (বছর, মাস, দিন)"
        ],
        tips: [
          "ভবিষ্যতের কোন তারিখে বয়স জানতে current date পরিবর্তন করুন",
          "সঠিক জন্ম তারিখ দিন নির্ভুল ফলাফলের জন্য",
          "পরবর্তী জন্মদিন কত দিন বাকি তাও দেখতে পাবেন"
        ],
        features: [
          "সুনির্দিষ্ট বয়স গণনা",
          "বছর, মাস, দিন ভাগ",
          "পরবর্তী জন্মদিন কাউন্টডাউন",
          "তাৎক্ষণিক ফলাফল"
        ],
        benefits: [
          "সঠিক বয়স জানা",
          "ডকুমেন্ট ফিলআপে সহায়ক",
          "জন্মদিন ট্র্যাকিং",
          "সহজ ইন্টারফেস"
        ]
      },
      "date-difference": {
        steps: [
          "প্রথম তারিখ (From Date) সিলেক্ট করুন",
          "দ্বিতীয় তারিখ (To Date) সিলেক্ট করুন",
          "'Calculate Difference' বাটনে ক্লিক করুন",
          "পার্থক্য দেখুন (দিন, সপ্তাহ, মাস, বছর)"
        ],
        tips: [
          "ইভেন্ট পরিকল্পনার জন্য ব্যবহার করুন",
          "প্রজেক্ট টাইমলাইন হিসাব করুন",
          "ছুটির দিন গণনা করুন",
          "কর্মদিবস হিসাব করুন"
        ],
        features: [
          "দুই তারিখের পার্থক্য",
          "দিন, সপ্তাহ, মাস গণনা",
          "কর্মদিবস গণনা",
          "ক্যালেন্ডার ভিউ"
        ],
        benefits: [
          "প্রজেক্ট প্ল্যানিং সহায়ক",
          "ইভেন্ট অর্গানাইজিং",
          "ছুটির পরিকল্পনা",
          "সময় ব্যবস্থাপনা"
        ]
      },
      "profit-loss": {
        steps: [
          "ক্রয় মূল্য (Cost Price) ইনপুট করুন",
          "বিক্রয় মূল্য (Selling Price) ইনপুট করুন",
          "'Calculate' বাটনে ক্লিক করুন",
          "লাভ/ক্ষতি এবং শতাংশ দেখুন"
        ],
        tips: [
          "সব খরচ (transport, tax) cost price এ যোগ করুন",
          "বাজার দর চেক করে selling price নির্ধারণ করুন",
          "লাভের শতাংশ বিশ্লেষণ করুন",
          "প্রতিযোগীদের দামের সাথে তুলনা করুন"
        ],
        features: [
          "লাভ-ক্ষতি গণনা",
          "শতাংশ হিসাব",
          "লাভের মার্জিন",
          "বিস্তারিত বিশ্লেষণ"
        ],
        benefits: [
          "ব্যবসায়িক সিদ্ধান্ত সহায়ক",
          "দাম নির্ধারণে সাহায্য",
          "লাভজনকতা বিশ্লেষণ",
          "বাজেট পরিকল্পনা"
        ]
      },
      "area-calculator": {
        steps: [
          "আকৃতি (Rectangle, Circle, Triangle) বেছে নিন",
          "প্রয়োজনীয় মাত্রা ইনপুট করুন",
          "একক (Unit) সিলেক্ট করুন",
          "'Calculate Area' বাটনে ক্লিক করুন"
        ],
        tips: [
          "সঠিক মাপ নিশ্চিত করুন",
          "একই একক ব্যবহার করুন",
          "জটিল আকৃতি ভেঙে ছোট অংশে হিসাব করুন",
          "রুম সাইজ, জমির আয়তন হিসাব করুন"
        ],
        features: [
          "একাধিক আকৃতি সাপোর্ট",
          "বিভিন্ন একক",
          "ভিজ্যুয়াল প্রিভিউ",
          "ফর্মুলা প্রদর্শন"
        ],
        benefits: [
          "নির্মাণ কাজে সহায়ক",
          "জমি পরিমাপে উপযোগী",
          "ইন্টেরিয়ার ডিজাইনে কাজে লাগে",
          "গণিত শিক্ষায় সহায়ক"
        ]
      },
      "ecommerce-profit": {
        steps: [
          "পণ্যের খরচ (Product Cost) ইনপুট করুন",
          "বিক্রয় মূল্য (Selling Price) দিন",
          "অতিরিক্ত খরচ (Shipping, Tax, Fees) যোগ করুন",
          "'Calculate Profit' বাটনে ক্লিক করুন"
        ],
        tips: [
          "সব hidden cost বিবেচনা করুন",
          "Platform fees (Amazon, eBay) যোগ করুন",
          "রিটার্ন এবং রিফান্ড খরচ হিসাব করুন",
          "মার্কেটিং খরচ অন্তর্ভুক্ত করুন"
        ],
        features: [
          "ই-কমার্স স্পেসিফিক গণনা",
          "Platform fees হিসাব",
          "শিপিং কস্ট",
          "মার্জিন বিশ্লেষণ"
        ],
        benefits: [
          "অনলাইন বিজনেস অপ্টিমাইজেশন",
          "প্রাইসিং স্ট্র্যাটেজি",
          "লাভজনকতা বিশ্লেষণ",
          "কস্ট ম্যানেজমেন্ট"
        ]
      },
      "gmail-generator": {
        steps: [
          "আপনার Gmail address ইনপুট করুন",
          "Dots (.) এবং Plus (+) ভেরিয়েশন দেখুন",
          "প্রয়োজনীয় ভেরিয়েশন কপি করুন",
          "বিভিন্ন সাইটে আলাদা ইমেইল হিসেবে ব্যবহার করুন"
        ],
        tips: [
          "একই Gmail একাউন্টে সব মেইল আসবে",
          "সাইট অনুযায়ী ভিন্ন alias ব্যবহার করুন",
          "Filtering এর জন্য plus সাইন ব্যবহার করুন",
          "স্প্যাম ট্র্যাকিং এর জন্য কাজে লাগে"
        ],
        features: [
          "Dots variation",
          "Plus sign variation",
          "Auto generation",
          "Easy copy function"
        ],
        benefits: [
          "একাধিক একাউন্ট তৈরি",
          "ইমেইল অর্গানাইজেশন",
          "স্প্যাম ট্র্যাকিং",
          "প্রাইভেসি বৃদ্ধি"
        ]
      },
      "qr-code-generator": {
        steps: [
          "QR কোডের জন্য টেক্সট/URL ইনপুট করুন",
          "সাইজ এবং কালার কাস্টমাইজ করুন (অপশনাল)",
          "'Generate QR Code' বাটনে ক্লিক করুন",
          "QR কোড ডাউনলোড বা শেয়ার করুন"
        ],
        tips: [
          "URL এর জন্য https:// যোগ করুন",
          "ছোট টেক্সট ভালো QR কোড তৈরি করে",
          "প্রিন্ট করার আগে টেস্ট করুন",
          "উচ্চ রেজোলিউশনে ডাউনলোড করুন"
        ],
        features: [
          "টেক্সট, URL, ফোন নম্বর সাপোর্ট",
          "কাস্টম সাইজ",
          "কালার অপশন",
          "ইনস্ট্যান্ট ডাউনলোড"
        ],
        benefits: [
          "দ্রুত তথ্য শেয়ারিং",
          "কন্টাক্টলেস শেয়ারিং",
          "মার্কেটিং টুল",
          "সহজ স্ক্যানিং"
        ]
      },
      "password-generator": {
        steps: [
          "পাসওয়ার্ডের দৈর্ঘ্য (Length) সিলেক্ট করুন",
          "Character type (Uppercase, Lowercase, Numbers, Symbols) বেছে নিন",
          "'Generate Password' বাটনে ক্লিক করুন",
          "নিরাপদ পাসওয়ার্ড কপি করে ব্যবহার করুন"
        ],
        tips: [
          "কমপক্ষে ১২ অক্ষরের পাসওয়ার্ড ব্যবহার করুন",
          "সব ধরনের character মিশ্রণ করুন",
          "প্রতিটি একাউন্টের জন্য আলাদা পাসওয়ার্ড",
          "Password manager ব্যবহার করুন"
        ],
        features: [
          "কাস্টম লেংথ",
          "Character type সিলেকশন",
          "মাল্টিপল জেনারেশন",
          "কপি ফাংশন"
        ],
        benefits: [
          "শক্তিশালী নিরাপত্তা",
          "হ্যাকিং প্রতিরোধ",
          "একাউন্ট সুরক্ষা",
          "র্যান্ডম জেনারেশন"
        ]
      },
      "image-converter": {
        steps: [
          "ইমেজ ফাইল আপলোড করুন",
          "আউটপুট ফরম্যাট (JPG, PNG, WebP) বেছে নিন",
          "কোয়ালিটি সেটিংস অ্যাডজাস্ট করুন",
          "'Convert' বাটনে ক্লিক করে ডাউনলোড করুন"
        ],
        tips: [
          "WebP ফরম্যাট ছোট সাইজের জন্য ভালো",
          "PNG ট্রান্সপ্যারেন্সির জন্য",
          "JPG ফটোগ্রাফের জন্য",
          "কোয়ালিটি অনুযায়ী সাইজ পরিবর্তন হয়"
        ],
        features: [
          "মাল্টিপল ফরম্যাট সাপোর্ট",
          "কোয়ালিটি কন্ট্রোল",
          "ব্যাচ কনভার্সন",
          "প্রিভিউ ফাংশন"
        ],
        benefits: [
          "ওয়েব অপ্টিমাইজেশন",
          "স্টোরেজ সেভিং",
          "ক্রস-প্ল্যাটফর্ম সাপোর্ট",
          "সাইজ রিডাকশন"
        ]
      },
      "image-compressor": {
        steps: [
          "ইমেজ ফাইল আপলোড করুন",
          "কম্প্রেশন লেভেল সিলেক্ট করুন",
          "প্রিভিউ দেখে সাইজ চেক করুন",
          "'Compress' বাটনে ক্লিক করে ডাউনলোড করুন"
        ],
        tips: [
          "Original এর ব্যাকআপ রাখুন",
          "ওয়েবসাইটের জন্য ৭০-৮০% কোয়ালিটি যথেষ্ট",
          "প্রিন্টের জন্য উচ্চ কোয়ালিটি রাখুন",
          "Before-After তুলনা করুন"
        ],
        features: [
          "লসলেস/লসি কম্প্রেশন",
          "সাইজ প্রিভিউ",
          "কোয়ালিটি কন্ট্রোল",
          "ব্যাচ প্রসেসিং"
        ],
        benefits: [
          "ওয়েবসাইট স্পিড বৃদ্ধি",
          "স্টোরেজ সাশ্রয়",
          "লোডিং টাইম কমানো",
          "ব্যান্ডউইথ সেভিং"
        ]
      },
      "word-counter": {
        steps: [
          "টেক্সট বক্সে আপনার লেখা পেস্ট করুন বা টাইপ করুন",
          "রিয়েল টাইমে Word, Character count দেখুন",
          "Paragraph, Sentence count চেক করুন",
          "প্রয়োজনে টেক্সট এডিট করুন"
        ],
        tips: [
          "SEO এর জন্য optimal word count মেইনটেইন করুন",
          "সোশ্যাল মিডিয়া character limit চেক করুন",
          "এসাইনমেন্টের word limit ট্র্যাক করুন",
          "Reading time estimate ব্যবহার করুন"
        ],
        features: [
          "রিয়েল টাইম কাউন্টিং",
          "Multiple metrics",
          "Reading time estimate",
          "Character density analysis"
        ],
        benefits: [
          "কন্টেন্ট অপ্টিমাইজেশন",
          "লেখার মান উন্নতি",
          "প্ল্যাটফর্ম লিমিট ট্র্যাকিং",
          "প্রোডাক্টিভিটি বৃদ্ধি"
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