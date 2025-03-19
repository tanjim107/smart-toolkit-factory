
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { format, differenceInYears, differenceInMonths, differenceInDays, isBefore, isAfter } from "date-fns";

const AgeCalculator = () => {
  const { toast } = useToast();
  const today = new Date();
  
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [ageResult, setAgeResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalMonths: number;
    totalWeeks: number;
    totalDays: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) {
      toast({
        title: "Input Error",
        description: "Please select your birth date",
        variant: "destructive",
      });
      return;
    }
    
    if (isAfter(birthDate, today)) {
      toast({
        title: "Input Error",
        description: "Birth date cannot be in the future",
        variant: "destructive",
      });
      return;
    }
    
    // Calculate years
    const years = differenceInYears(today, birthDate);
    
    // Calculate remaining months
    const dateWithYearsSubtracted = new Date(today);
    dateWithYearsSubtracted.setFullYear(today.getFullYear() - years);
    const months = differenceInMonths(dateWithYearsSubtracted, birthDate);
    
    // Calculate remaining days
    const dateWithMonthsSubtracted = new Date(dateWithYearsSubtracted);
    dateWithMonthsSubtracted.setMonth(dateWithYearsSubtracted.getMonth() - months);
    const days = differenceInDays(dateWithMonthsSubtracted, birthDate);
    
    // Calculate total values
    const totalMonths = differenceInMonths(today, birthDate);
    const totalDays = differenceInDays(today, birthDate);
    const totalWeeks = Math.floor(totalDays / 7);
    
    setAgeResult({
      years,
      months: Math.abs(months),
      days: Math.abs(days),
      totalMonths,
      totalWeeks,
      totalDays
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Date of Birth</label>
            <div className="border border-border rounded-md p-3">
              {birthDate ? (
                <div className="flex justify-between items-center">
                  <span>{format(birthDate, 'PPP')}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setBirthDate(undefined)}
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <Calendar
                  mode="single"
                  selected={birthDate}
                  onSelect={setBirthDate}
                  disabled={(date) => isAfter(date, today)}
                  initialFocus
                />
              )}
            </div>
          </div>
          
          <Button onClick={calculateAge} className="w-full">Calculate Age</Button>
        </div>
        
        {ageResult && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="p-4 rounded-md bg-primary/10">
              <h3 className="font-medium mb-3">Your Age</h3>
              <div className="text-2xl font-bold mb-2">
                {ageResult.years} years, {ageResult.months} months, {ageResult.days} days
              </div>
              <p className="text-sm text-muted-foreground">
                Born on {format(birthDate!, 'PPP')}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="p-3 rounded-md bg-primary/5">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Months</span>
                  <span className="font-semibold">{ageResult.totalMonths} months</span>
                </div>
              </div>
              
              <div className="p-3 rounded-md bg-primary/5">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Weeks</span>
                  <span className="font-semibold">{ageResult.totalWeeks} weeks</span>
                </div>
              </div>
              
              <div className="p-3 rounded-md bg-primary/5">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Days</span>
                  <span className="font-semibold">{ageResult.totalDays} days</span>
                </div>
              </div>
            </div>
            
            {ageResult.years >= 18 && (
              <div className="p-3 rounded-md bg-green-500/10 text-green-600">
                <div className="font-medium">You are an adult</div>
                <div className="text-sm">You've been an adult for {ageResult.years - 18} years</div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AgeCalculator;
