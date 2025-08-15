import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, differenceInYears, differenceInMonths, differenceInDays, differenceInWeeks, differenceInHours, differenceInSeconds, isAfter } from "date-fns";

const ImprovedDateDifferenceCalculator = () => {
  const { toast } = useToast();
  
  const [startYear, setStartYear] = useState<string>("");
  const [startMonth, setStartMonth] = useState<string>("");
  const [startDay, setStartDay] = useState<string>("");
  const [endYear, setEndYear] = useState<string>("");
  const [endMonth, setEndMonth] = useState<string>("");
  const [endDay, setEndDay] = useState<string>("");
  
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
  const [dateResult, setDateResult] = useState<{
    years: number;
    months: number;
    weeks: number;
    days: number;
    hours: number;
    seconds: number;
    totalDays: number;
  } | null>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i + 50);
  
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

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const startDays = startYear && startMonth 
    ? Array.from({ length: getDaysInMonth(parseInt(startYear), parseInt(startMonth)) }, (_, i) => i + 1)
    : Array.from({ length: 31 }, (_, i) => i + 1);

  const endDays = endYear && endMonth 
    ? Array.from({ length: getDaysInMonth(parseInt(endYear), parseInt(endMonth)) }, (_, i) => i + 1)
    : Array.from({ length: 31 }, (_, i) => i + 1);

  // Update start date when all three values are selected
  React.useEffect(() => {
    if (startYear && startMonth && startDay) {
      const newStartDate = new Date(parseInt(startYear), parseInt(startMonth) - 1, parseInt(startDay));
      setStartDate(newStartDate);
    }
  }, [startYear, startMonth, startDay]);

  // Update end date when all three values are selected
  React.useEffect(() => {
    if (endYear && endMonth && endDay) {
      const newEndDate = new Date(parseInt(endYear), parseInt(endMonth) - 1, parseInt(endDay));
      setEndDate(newEndDate);
    }
  }, [endYear, endMonth, endDay]);

  const calculateDateDifference = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Input Error",
        description: "Please select both dates",
        variant: "destructive",
      });
      return;
    }
    
    if (isAfter(startDate, endDate)) {
      toast({
        title: "Input Error",
        description: "Start date cannot be after end date",
        variant: "destructive",
      });
      return;
    }
    
    // Calculate the various differences
    const years = differenceInYears(endDate, startDate);
    const months = differenceInMonths(endDate, startDate);
    const weeks = differenceInWeeks(endDate, startDate);
    const days = differenceInDays(endDate, startDate);
    const hours = differenceInHours(endDate, startDate);
    const seconds = differenceInSeconds(endDate, startDate);
    
    setDateResult({
      years,
      months,
      weeks,
      days,
      hours,
      seconds,
      totalDays: days
    });
  };

  const resetForm = () => {
    setStartYear("");
    setStartMonth("");
    setStartDay("");
    setEndYear("");
    setEndMonth("");
    setEndDay("");
    setStartDate(undefined);
    setEndDate(undefined);
    setDateResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Start Date Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-primary">Start Date</h3>
            <div className="grid grid-cols-1 gap-3">
              <Select value={startYear} onValueChange={setStartYear}>
                <SelectTrigger>
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

              <Select value={startMonth} onValueChange={setStartMonth}>
                <SelectTrigger>
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

              <Select value={startDay} onValueChange={setStartDay}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Day" />
                </SelectTrigger>
                <SelectContent>
                  {startDays.map((day) => (
                    <SelectItem key={day} value={day.toString()}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {startDate && (
              <div className="p-3 bg-primary/10 rounded-md">
                <div className="text-sm font-medium text-primary">
                  Start: {format(startDate, 'PPP')}
                </div>
              </div>
            )}
          </div>

          {/* End Date Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-primary">End Date</h3>
            <div className="grid grid-cols-1 gap-3">
              <Select value={endYear} onValueChange={setEndYear}>
                <SelectTrigger>
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

              <Select value={endMonth} onValueChange={setEndMonth}>
                <SelectTrigger>
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

              <Select value={endDay} onValueChange={setEndDay}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Day" />
                </SelectTrigger>
                <SelectContent>
                  {endDays.map((day) => (
                    <SelectItem key={day} value={day.toString()}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {endDate && (
              <div className="p-3 bg-primary/10 rounded-md">
                <div className="text-sm font-medium text-primary">
                  End: {format(endDate, 'PPP')}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={calculateDateDifference} 
              className="flex-1"
              disabled={!startDate || !endDate}
            >
              Calculate Difference
            </Button>
            
            <Button 
              onClick={resetForm} 
              variant="outline"
              className="px-6"
            >
              Reset
            </Button>
          </div>
        </div>
        
        {dateResult && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20">
              <h3 className="font-medium mb-4 text-primary">Date Difference</h3>
              <div className="text-3xl font-bold mb-2">
                {dateResult.days.toLocaleString()} days
              </div>
              <p className="text-sm text-muted-foreground">
                From {format(startDate!, 'PPP')} to {format(endDate!, 'PPP')}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-md bg-primary/5 border border-primary/10">
                <div className="text-2xl font-bold text-primary">{dateResult.years}</div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
              
              <div className="p-4 rounded-md bg-primary/5 border border-primary/10">
                <div className="text-2xl font-bold text-primary">{dateResult.months}</div>
                <div className="text-sm text-muted-foreground">Months</div>
              </div>
              
              <div className="p-4 rounded-md bg-primary/5 border border-primary/10">
                <div className="text-2xl font-bold text-primary">{dateResult.weeks}</div>
                <div className="text-sm text-muted-foreground">Weeks</div>
              </div>
              
              <div className="p-4 rounded-md bg-primary/5 border border-primary/10">
                <div className="text-2xl font-bold text-primary">{dateResult.hours.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Hours</div>
              </div>
            </div>

            <div className="p-4 rounded-md bg-secondary/10 border border-secondary/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">
                  {dateResult.seconds.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Seconds</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ImprovedDateDifferenceCalculator;