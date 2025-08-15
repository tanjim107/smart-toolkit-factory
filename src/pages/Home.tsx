import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator, Star, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { tools } from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import Advertisement from "@/components/Advertisement";

const Home = () => {
  const featuredTools = tools.slice(0, 6);
  const popularTools = tools.slice(6, 12);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-br from-primary/10 to-secondary/10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SmartToolkit
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            বিনামূল্যে অনলাইন ক্যালকুলেটর এবং ইউটিলিটি টুলস। দ্রুত, সঠিক এবং সহজেই ব্যবহারযোগ্য।
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Badge variant="secondary" className="px-4 py-2">
              <Star className="h-4 w-4 mr-2" />
              ১৫+ প্রো টুলস
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              ১০,০০০+ ব্যবহারকারী
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <TrendingUp className="h-4 w-4 mr-2" />
              ৯৯.৯% আপটাইম
            </Badge>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link to="/calculator">
                এখনই শুরু করুন
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              সব টুলস দেখুন
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Advertisement */}
      <Advertisement 
        position="top"
        className="my-8"
      />

      {/* Featured Tools */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">জনপ্রিয় টুলস</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              আমাদের সবচেয়ে জনপ্রিয় এবং ব্যবহারকারী-বান্ধব টুলসগুলি আবিষ্কার করুন
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advertisement */}
      <Advertisement 
        position="middle"
        className="my-8"
      />

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12">কেন SmartToolkit বেছে নেবেন?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">১৫+</div>
                <h3 className="text-xl font-semibold mb-2">পেশাদার টুলস</h3>
                <p className="text-muted-foreground">ক্যালকুলেটর থেকে ইমেজ কনভার্টার - সব এক জায়গায়</p>
              </Card>
              
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">১০০%</div>
                <h3 className="text-xl font-semibold mb-2">বিনামূল্যে</h3>
                <p className="text-muted-foreground">কোনো রেজিস্ট্রেশন বা পেমেন্ট প্রয়োজন নেই</p>
              </Card>
              
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">২৪/৭</div>
                <h3 className="text-xl font-semibold mb-2">উপলব্ধ</h3>
                <p className="text-muted-foreground">যেকোনো সময়, যেকোনো ডিভাইস থেকে ব্যবহার করুন</p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* More Tools */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">আরও টুলস</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              আপনার দৈনন্দিন কাজের জন্য আরও উপযোগী টুলস
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-8 py-6">
              সব টুলস দেখুন
            </Button>
          </div>
        </div>
      </section>

      {/* Advertisement */}
      <Advertisement 
        position="bottom"
        className="my-8"
      />

      {/* Footer CTA */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">আজই শুরু করুন</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              আমাদের বিনামূল্যে টুলস দিয়ে আপনার কাজ সহজ করুন। কোনো সাইন আপ প্রয়োজন নেই।
            </p>
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link to="/calculator">
                ক্যালকুলেটর ব্যবহার করুন
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;