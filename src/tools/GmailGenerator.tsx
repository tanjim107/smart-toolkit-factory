
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";

const GmailGenerator = () => {
  const { toast } = useToast();
  
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [additionalText, setAdditionalText] = useState<string>("");
  const [generatedEmails, setGeneratedEmails] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>("gmail.com");

  const generateEmails = () => {
    if (!firstName && !lastName) {
      toast({
        title: "Input Error",
        description: "Please enter at least first name or last name",
        variant: "destructive",
      });
      return;
    }
    
    const first = firstName.toLowerCase().replace(/[^a-z0-9]/g, "");
    const last = lastName.toLowerCase().replace(/[^a-z0-9]/g, "");
    const additional = additionalText.toLowerCase().replace(/[^a-z0-9]/g, "");
    
    const emails: string[] = [];
    
    // Generate variations
    if (first && last) {
      emails.push(`${first}${last}@${selectedDomain}`);
      emails.push(`${first}.${last}@${selectedDomain}`);
      emails.push(`${first}_${last}@${selectedDomain}`);
      emails.push(`${first}${last[0]}@${selectedDomain}`);
      emails.push(`${first[0]}${last}@${selectedDomain}`);
      emails.push(`${last}${first}@${selectedDomain}`);
      emails.push(`${last}.${first}@${selectedDomain}`);
      emails.push(`${last}_${first}@${selectedDomain}`);
      
      if (additional) {
        emails.push(`${first}${last}${additional}@${selectedDomain}`);
        emails.push(`${first}.${last}.${additional}@${selectedDomain}`);
        emails.push(`${first}${additional}@${selectedDomain}`);
        emails.push(`${first}${last}${additional}@${selectedDomain}`);
      }
    } else if (first) {
      emails.push(`${first}@${selectedDomain}`);
      
      if (additional) {
        emails.push(`${first}${additional}@${selectedDomain}`);
        emails.push(`${first}.${additional}@${selectedDomain}`);
        emails.push(`${first}_${additional}@${selectedDomain}`);
      }
    } else if (last) {
      emails.push(`${last}@${selectedDomain}`);
      
      if (additional) {
        emails.push(`${last}${additional}@${selectedDomain}`);
        emails.push(`${last}.${additional}@${selectedDomain}`);
        emails.push(`${last}_${additional}@${selectedDomain}`);
      }
    }
    
    // Add year variations
    const currentYear = new Date().getFullYear();
    emails.push(`${first}${last}${currentYear}@${selectedDomain}`);
    emails.push(`${first}${currentYear}@${selectedDomain}`);
    
    // Remove duplicates
    const uniqueEmails = [...new Set(emails)];
    
    setGeneratedEmails(uniqueEmails);
  };

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email).then(() => {
      toast({
        title: "Copied!",
        description: `${email} copied to clipboard`,
      });
    });
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDomain(e.target.value);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">First Name</label>
              <Input
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Last Name</label>
              <Input
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Additional Text (Optional)</label>
            <Input
              type="text"
              placeholder="E.g., birth year, nickname, etc."
              value={additionalText}
              onChange={(e) => setAdditionalText(e.target.value)}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Domain</label>
            <select
              className="w-full p-2 border border-border rounded-md bg-background"
              value={selectedDomain}
              onChange={handleDomainChange}
            >
              <option value="gmail.com">gmail.com</option>
              <option value="outlook.com">outlook.com</option>
              <option value="yahoo.com">yahoo.com</option>
              <option value="hotmail.com">hotmail.com</option>
              <option value="protonmail.com">protonmail.com</option>
            </select>
          </div>
          
          <Button onClick={generateEmails} className="w-full">Generate Email Suggestions</Button>
        </div>
        
        {generatedEmails.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h3 className="text-sm font-medium">Email Suggestions</h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
              {generatedEmails.map((email, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-md bg-primary/5 hover:bg-primary/10 transition-colors"
                >
                  <span className="text-sm font-mono">{email}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => copyEmail(email)}
                    className="h-8 w-8 p-0 flex items-center justify-center"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="text-sm text-muted-foreground bg-primary/5 p-4 rounded-md">
              <p>
                These are suggestions only. Availability depends on whether someone else has already 
                registered these email addresses.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GmailGenerator;
