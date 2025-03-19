
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getToolById } from "@/data/tools";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

const ToolPage: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const tool = getToolById(toolId || "");
  const { toast } = useToast();

  // If tool not found, show message
  if (!tool) {
    React.useEffect(() => {
      toast({
        title: "Tool not found",
        description: "The requested tool does not exist.",
        variant: "destructive",
      });
    }, [toast]);

    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <div className="text-center max-w-md">
          <h1 className="text-9xl font-bold text-primary/20">404</h1>
          <h2 className="text-2xl font-bold mt-6 mb-3">Page not found</h2>
          <p className="text-muted-foreground mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <Button onClick={() => navigate("/")} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to homepage</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className={cn("p-2 rounded-md", tool.color)}>
            <tool.icon className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold">{tool.name}</h1>
        </div>
        <p className="text-muted-foreground">{tool.description}</p>
        <Separator className="mt-4" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass-darker p-6 rounded-xl shadow-glass border border-border/10"
      >
        <div className="flex items-center justify-center p-12">
          <p className="text-center">
            This is a placeholder for the {tool.name} tool. Implement the specific tool functionality here.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ToolPage;
