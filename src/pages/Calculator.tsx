import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Calculator as CalculatorIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { tools } from "@/data/tools";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import UsageInstructions from "@/components/UsageInstructions";
import AdSpace from "@/components/AdSpace";

const calculator = tools.find(tool => tool.id === "calculator")!;

interface CalculatorButtonProps {
  value: string;
  onClick: (value: string) => void;
  className?: string;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ 
  value, 
  onClick, 
  className 
}) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "h-12 text-sm font-medium transition-all",
        "hover:bg-primary/5 active:scale-95",
        className
      )}
      onClick={() => onClick(value)}
    >
      {value}
    </Button>
  );
};

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [formula, setFormula] = useState("");
  const [calculated, setCalculated] = useState(false);
  const [isInverse, setIsInverse] = useState(false);
  const [angleMode, setAngleMode] = useState<"DEG" | "RAD">("DEG"); // Default to degrees
  const [memory, setMemory] = useState(0);

  const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  const toDegrees = (radians: number) => radians * (180 / Math.PI);

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  const evaluateExpression = (expr: string): number => {
    // Replace display symbols with JavaScript math functions
    let expression = expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/π/g, Math.PI.toString())
      .replace(/e/g, Math.E.toString());

    try {
      // eslint-disable-next-line no-eval
      return eval(expression);
    } catch (error) {
      throw new Error("Invalid expression");
    }
  };

  const handleButtonClick = (value: string) => {
    if (calculated && "0123456789.".includes(value)) {
      setCalculated(false);
      setDisplay(value);
      setFormula(value);
      return;
    }

    if (calculated && !["+", "-", "×", "÷", "="].includes(value)) {
      setCalculated(false);
    }

    switch (value) {
      case "C":
        setDisplay("0");
        setFormula("");
        setCalculated(false);
        break;
      case "CE":
        setDisplay("0");
        break;
      case "←":
        if (display.length > 1) {
          setDisplay(display.slice(0, -1));
          setFormula(formula.slice(0, -1));
        } else {
          setDisplay("0");
          setFormula("");
        }
        break;
      case "=":
        try {
          const result = evaluateExpression(formula);
          setDisplay(result.toString());
          setFormula(`${formula} = ${result}`);
          setCalculated(true);
        } catch (error) {
          setDisplay("Error");
          setTimeout(() => {
            setDisplay("0");
            setFormula("");
          }, 1500);
        }
        break;
      case "+":
      case "-":
      case "×":
      case "÷":
        if (calculated) {
          setFormula(display + value);
          setCalculated(false);
        } else {
          const lastChar = formula[formula.length - 1];
          if ("+-×÷".includes(lastChar)) {
            setFormula(formula.slice(0, -1) + value);
          } else {
            setFormula(formula + value);
          }
        }
        setDisplay("0");
        break;
      case ".":
        if (!display.includes(".")) {
          setDisplay(display + ".");
          setFormula(formula + ".");
        }
        break;
      case "π":
        setDisplay(Math.PI.toString());
        setFormula(formula + Math.PI.toString());
        break;
      case "e":
        setDisplay(Math.E.toString());
        setFormula(formula + Math.E.toString());
        break;
      case "sin":
        try {
          const num = parseFloat(display);
          const angle = angleMode === "DEG" ? toRadians(num) : num;
          const result = isInverse ? Math.asin(num) : Math.sin(angle);
          const finalResult = isInverse && angleMode === "DEG" ? toDegrees(result) : result;
          setDisplay(finalResult.toString());
          setFormula(`${isInverse ? "asin" : "sin"}(${display})`);
          setCalculated(true);
        } catch (error) {
          setDisplay("Error");
        }
        break;
      case "cos":
        try {
          const num = parseFloat(display);
          const angle = angleMode === "DEG" ? toRadians(num) : num;
          const result = isInverse ? Math.acos(num) : Math.cos(angle);
          const finalResult = isInverse && angleMode === "DEG" ? toDegrees(result) : result;
          setDisplay(finalResult.toString());
          setFormula(`${isInverse ? "acos" : "cos"}(${display})`);
          setCalculated(true);
        } catch (error) {
          setDisplay("Error");
        }
        break;
      case "tan":
        try {
          const num = parseFloat(display);
          const angle = angleMode === "DEG" ? toRadians(num) : num;
          const result = isInverse ? Math.atan(num) : Math.tan(angle);
          const finalResult = isInverse && angleMode === "DEG" ? toDegrees(result) : result;
          setDisplay(finalResult.toString());
          setFormula(`${isInverse ? "atan" : "tan"}(${display})`);
          setCalculated(true);
        } catch (error) {
          setDisplay("Error");
        }
        break;
      case "log":
        try {
          const num = parseFloat(display);
          const result = Math.log10(num);
          setDisplay(result.toString());
          setFormula(`log(${display})`);
          setCalculated(true);
        } catch (error) {
          setDisplay("Error");
        }
        break;
      case "ln":
        try {
          const num = parseFloat(display);
          const result = Math.log(num);
          setDisplay(result.toString());
          setFormula(`ln(${display})`);
          setCalculated(true);
        } catch (error) {
          setDisplay("Error");
        }
        break;
      case "√":
        try {
          const num = parseFloat(display);
          const result = Math.sqrt(num);
          setDisplay(result.toString());
          setFormula(`√(${display})`);
          setCalculated(true);
        } catch (error) {
          setDisplay("Error");
        }
        break;
      case "x²":
        try {
          const num = parseFloat(display);
          const result = Math.pow(num, 2);
          setDisplay(result.toString());
          setFormula(`(${display})²`);
          setCalculated(true);
        } catch (error) {
          setDisplay("Error");
        }
        break;
      case "x!":
        try {
          const num = parseInt(display);
          const result = factorial(num);
          setDisplay(result.toString());
          setFormula(`${display}!`);
          setCalculated(true);
        } catch (error) {
          setDisplay("Error");
        }
        break;
      case "x^y":
        setFormula(formula + "^");
        setDisplay("0");
        break;
      case "INV":
        setIsInverse(!isInverse);
        break;
      case "DEG":
        setAngleMode("DEG");
        break;
      case "RAD":
        setAngleMode("RAD");
        break;
      case "(":
      case ")":
        setFormula(formula + value);
        break;
      default:
        if ("0123456789".includes(value)) {
          if (display === "0") {
            setDisplay(value);
            setFormula(calculated ? value : formula + value);
          } else {
            setDisplay(display + value);
            setFormula(formula + value);
          }
        }
        break;
    }
  };

  return (
    <>
      <SEOHead tool={calculator} />
      <div className="max-w-4xl mx-auto">
        <AdSpace 
          position="top" 
          className="mb-6 flex justify-center"
          adCode={`<script type="text/javascript">
            atOptions = {
              'key' : 'ec4628848dbefce1f8db6f8fc0976c19',
              'format' : 'iframe',
              'height' : 90,
              'width' : 728,
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="//www.highperformanceformat.com/ec4628848dbefce1f8db6f8fc0976c19/invoke.js"></script>`}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={cn("p-2 rounded-md", calculator.color)}>
              <CalculatorIcon className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold">{calculator.name}</h1>
          </div>
          <p className="text-muted-foreground">{calculator.description}</p>
        </motion.div>

        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="glass-darker overflow-hidden border-none">
              <div className="p-4 space-y-4">
                {/* Display Screen */}
                <div className="bg-background/50 rounded-lg border border-border/50 p-4 h-24 flex flex-col items-end justify-end">
                  <div className="text-xs text-muted-foreground overflow-x-auto whitespace-nowrap w-full text-right mb-1">
                    {formula}
                  </div>
                  <div className="text-3xl font-medium overflow-x-auto w-full text-right">
                    {display}
                  </div>
                </div>

                {/* Mode indicators */}
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span className={cn("px-2 py-1 rounded", angleMode === "DEG" ? "bg-primary/20 text-primary" : "")}>
                    {angleMode}
                  </span>
                  <span className={cn("px-2 py-1 rounded", isInverse ? "bg-primary/20 text-primary" : "")}>
                    {isInverse ? "INV" : ""}
                  </span>
                </div>

                {/* Calculator Buttons */}
                <div className="grid grid-cols-6 gap-2">
                  {/* Row 1: Mode controls */}
                  <CalculatorButton 
                    value="DEG" 
                    onClick={handleButtonClick} 
                    className={cn("text-xs", angleMode === "DEG" ? "bg-primary/20 text-primary" : "")} 
                  />
                  <CalculatorButton 
                    value="RAD" 
                    onClick={handleButtonClick} 
                    className={cn("text-xs", angleMode === "RAD" ? "bg-primary/20 text-primary" : "")} 
                  />
                  <CalculatorButton 
                    value="INV" 
                    onClick={handleButtonClick} 
                    className={cn("text-xs", isInverse ? "bg-primary/20 text-primary" : "")} 
                  />
                  <CalculatorButton value="C" onClick={handleButtonClick} className="bg-red-50 text-red-500 hover:bg-red-100" />
                  <CalculatorButton value="CE" onClick={handleButtonClick} className="bg-red-50 text-red-500 hover:bg-red-100" />
                  <CalculatorButton value="←" onClick={handleButtonClick} />

                  {/* Row 2: Scientific functions */}
                  <CalculatorButton value="sin" onClick={handleButtonClick} className="text-xs bg-blue-50 text-blue-500 hover:bg-blue-100" />
                  <CalculatorButton value="cos" onClick={handleButtonClick} className="text-xs bg-blue-50 text-blue-500 hover:bg-blue-100" />
                  <CalculatorButton value="tan" onClick={handleButtonClick} className="text-xs bg-blue-50 text-blue-500 hover:bg-blue-100" />
                  <CalculatorButton value="ln" onClick={handleButtonClick} className="text-xs bg-blue-50 text-blue-500 hover:bg-blue-100" />
                  <CalculatorButton value="log" onClick={handleButtonClick} className="text-xs bg-blue-50 text-blue-500 hover:bg-blue-100" />
                  <CalculatorButton value="÷" onClick={handleButtonClick} className="bg-orange-50 text-orange-500 hover:bg-orange-100" />

                  {/* Row 3: More functions */}
                  <CalculatorButton value="√" onClick={handleButtonClick} className="bg-blue-50 text-blue-500 hover:bg-blue-100" />
                  <CalculatorButton value="x²" onClick={handleButtonClick} className="text-xs bg-blue-50 text-blue-500 hover:bg-blue-100" />
                  <CalculatorButton value="x^y" onClick={handleButtonClick} className="text-xs bg-blue-50 text-blue-500 hover:bg-blue-100" />
                  <CalculatorButton value="x!" onClick={handleButtonClick} className="text-xs bg-blue-50 text-blue-500 hover:bg-blue-100" />
                  <CalculatorButton value="(" onClick={handleButtonClick} />
                  <CalculatorButton value="×" onClick={handleButtonClick} className="bg-orange-50 text-orange-500 hover:bg-orange-100" />

                  {/* Row 4: Numbers and operations */}
                  <CalculatorButton value="π" onClick={handleButtonClick} className="bg-blue-50 text-blue-500 hover:bg-blue-100" />
                  <CalculatorButton value="e" onClick={handleButtonClick} className="bg-blue-50 text-blue-500 hover:bg-blue-100" />
                  <CalculatorButton value="7" onClick={handleButtonClick} />
                  <CalculatorButton value="8" onClick={handleButtonClick} />
                  <CalculatorButton value="9" onClick={handleButtonClick} />
                  <CalculatorButton value="-" onClick={handleButtonClick} className="bg-orange-50 text-orange-500 hover:bg-orange-100" />

                  {/* Row 5: Numbers */}
                  <CalculatorButton value=")" onClick={handleButtonClick} />
                  <CalculatorButton value="4" onClick={handleButtonClick} />
                  <CalculatorButton value="5" onClick={handleButtonClick} />
                  <CalculatorButton value="6" onClick={handleButtonClick} />
                  <CalculatorButton value="+" onClick={handleButtonClick} className="bg-orange-50 text-orange-500 hover:bg-orange-100 row-span-2" />

                  {/* Row 6: Numbers and equals */}
                  <CalculatorButton value="0" onClick={handleButtonClick} className="col-span-2" />
                  <CalculatorButton value="1" onClick={handleButtonClick} />
                  <CalculatorButton value="2" onClick={handleButtonClick} />
                  <CalculatorButton value="3" onClick={handleButtonClick} />

                  <CalculatorButton value="." onClick={handleButtonClick} />
                  <CalculatorButton value="=" onClick={handleButtonClick} className="bg-primary text-white hover:bg-primary/90 col-span-2" />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <AdSpace 
          position="middle" 
          className="my-6 flex justify-center"
          adCode={`<script type="text/javascript">
            atOptions = {
              'key' : '4950b1c28a30463619127963ce9ed6d9',
              'format' : 'iframe',
              'height' : 50,
              'width' : 320,
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="//www.highperformanceformat.com/4950b1c28a30463619127963ce9ed6d9/invoke.js"></script>`}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <UsageInstructions tool={calculator} />
        </motion.div>

        <AdSpace 
          position="bottom" 
          className="mt-6 flex justify-center"
          adCode={`<script type='text/javascript' src='//pl25599361.profitableratecpm.com/79/b2/89/79b289f9f560997b3a7e4def6618b167.js'></script>`}
        />
      </div>
    </>
  );
};

export default Calculator;