import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, differenceInYears, differenceInMonths, differenceInDays, isBefore, isAfter } from "date-fns";
import { Gift, Calendar as CalendarIcon, BarChart } from "lucide-react";

const ImprovedAgeCalculator = () => {
  const { toast } = useToast();
  const today = new Date();
  
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [ageResult, setAgeResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalMonths: number;
    totalWeeks: number;
    totalDays: number;
    nextBirthday: Date;
    daysUntilNextBirthday: number;
  } | null>(null);

  // Generate years array (100 years back from current year)
  const years = Array.from({ length: 100 }, (_, i) => today.getFullYear() - i);
  
  // Generate months array
  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }
  ];

  // Generate days array (depends on selected month and year)
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const days = selectedYear && selectedMonth 
    ? Array.from({ length: getDaysInMonth(parseInt(selectedYear), parseInt(selectedMonth)) }, (_, i) => i + 1)
    : Array.from({ length: 31 }, (_, i) => i + 1);

  // Update birth date when all three values are selected
  useEffect(() => {
    if (selectedYear && selectedMonth && selectedDay) {
      const newBirthDate = new Date(parseInt(selectedYear), parseInt(selectedMonth) - 1, parseInt(selectedDay));
      setBirthDate(newBirthDate);
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  // Calculate age when birth date changes
  useEffect(() => {
    if (birthDate) {
      calculateAge();
    }
  }, [birthDate]);

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
    
    // Calculate next birthday
    let nextBirthday = new Date(birthDate);
    nextBirthday.setFullYear(today.getFullYear());
    
    // If birthday has occurred this year already, set to next year
    if (isBefore(nextBirthday, today)) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    const daysUntilNextBirthday = differenceInDays(nextBirthday, today);
    
    setAgeResult({
      years,
      months: Math.abs(months),
      days: Math.abs(days),
      totalMonths,
      totalWeeks,
      totalDays,
      nextBirthday,
      daysUntilNextBirthday
    });
  };

  // Calculate percentage of year lived
  const getLifeProgressPercentage = (years: number) => {
    const averageLifeExpectancy = 80;
    const percentage = (years / averageLifeExpectancy) * 100;
    return Math.min(percentage, 100).toFixed(1);
  };

  const resetForm = () => {
    setSelectedYear("");
    setSelectedMonth("");
    setSelectedDay("");
    setBirthDate(undefined);
    setAgeResult(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-amber-50/10 border border-amber-100/20 rounded-lg p-4 shadow-sm">
            <label className="text-sm font-medium mb-4 block flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-amber-500" />
              <span>Select Your Birth Date</span>
            </label>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDay} onValueChange={setSelectedDay}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {birthDate && (
                <div className="p-3 bg-amber-100/10 rounded-md">
                  <div className="text-sm font-medium text-amber-600">
                    Selected Date: {format(birthDate, 'PPP')}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={resetForm}
                    className="mt-2 text-xs"
                  >
                    Reset
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {ageResult && (
            <div className="bg-amber-50/10 border border-amber-100/20 rounded-lg p-4 space-y-3">
              <h3 className="font-medium text-amber-500 flex items-center gap-2">
                <Gift className="w-4 h-4" />
                <span>Next Birthday</span>
              </h3>
              <div className="text-center py-3">
                <div className="text-3xl font-bold mb-1">
                  {ageResult.daysUntilNextBirthday}
                </div>
                <div className="text-sm text-muted-foreground">
                  days until you turn {ageResult.years + 1}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  on {format(ageResult.nextBirthday, 'PPP')}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {ageResult && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-3 space-y-5"
          >
            <div className="p-6 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-200/30">
              <div className="text-center">
                <div className="text-sm text-amber-200 mb-2">Your Age</div>
                <div className="text-4xl font-bold mb-3 text-white">
                  {ageResult.years}
                  <span className="text-2xl"> years</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-white/10 p-3 rounded-md">
                    <div className="text-2xl font-semibold">{ageResult.months}</div>
                    <div className="text-xs text-amber-100">months</div>
                  </div>
                  <div className="bg-white/10 p-3 rounded-md">
                    <div className="text-2xl font-semibold">{ageResult.days}</div>
                    <div className="text-xs text-amber-100">days</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-md bg-background/50 border border-border shadow-sm">
                <div className="text-2xl font-semibold">{ageResult.totalMonths}</div>
                <div className="text-xs text-muted-foreground">total months</div>
              </div>
              
              <div className="p-3 rounded-md bg-background/50 border border-border shadow-sm">
                <div className="text-2xl font-semibold">{ageResult.totalWeeks}</div>
                <div className="text-xs text-muted-foreground">total weeks</div>
              </div>
              
              <div className="p-3 rounded-md bg-background/50 border border-border shadow-sm">
                <div className="text-2xl font-semibold">{ageResult.totalDays}</div>
                <div className="text-xs text-muted-foreground">total days</div>
              </div>
            </div>
            
            <div className="bg-background/50 border border-border p-4 rounded-md space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart className="w-4 h-4 text-amber-500" />
                  <h3 className="font-medium">Life Progress</h3>
                </div>
                <div className="text-sm">{getLifeProgressPercentage(ageResult.years)}%</div>
              </div>
              
              <div className="w-full bg-amber-100/10 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-amber-300 h-2.5 rounded-full" 
                  style={{ width: `${getLifeProgressPercentage(ageResult.years)}%` }}
                ></div>
              </div>
              
              <p className="text-xs text-muted-foreground">
                Based on average life expectancy of 80 years
              </p>
            </div>
            
            {ageResult.years >= 18 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-3 rounded-md bg-green-500/10 text-green-600 border border-green-200/30"
              >
                <div className="font-medium">You are an adult</div>
                <div className="text-sm">You've been an adult for {ageResult.years - 18} years</div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ImprovedAgeCalculator;