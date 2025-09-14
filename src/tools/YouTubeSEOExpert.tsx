import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, History, Search, Youtube, Sparkles, Globe, Clock, FileText, Hash } from 'lucide-react';
import { toast } from 'sonner';

interface SEOContent {
  titles: string[];
  description: string;
  tags: string[];
  timestamp: Date;
  topic: string;
}

const YouTubeSEOExpert = () => {
  const [topic, setTopic] = useState('');
  const [targetAudience, setTargetAudience] = useState('General');
  const [language, setLanguage] = useState('English');
  const [tone, setTone] = useState('Educational');
  const [isLoading, setIsLoading] = useState(false);
  const [seoContent, setSeoContent] = useState<SEOContent | null>(null);
  const [history, setHistory] = useState<SEOContent[]>([]);

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('youtube-seo-history');
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory).map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp)
      }));
      
      // Filter out entries older than 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const validHistory = parsedHistory.filter((item: SEOContent) => 
        item.timestamp > sevenDaysAgo
      );
      
      setHistory(validHistory);
      
      // Update localStorage with filtered history
      localStorage.setItem('youtube-seo-history', JSON.stringify(validHistory));
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('youtube-seo-history', JSON.stringify(history));
    }
  }, [history]);

  const generateSEOContent = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic');
      return;
    }

    setIsLoading(true);

    try {
      const prompt = `
You are a YouTube SEO Expert. Generate content for this topic: "${topic}"

Target Audience: ${targetAudience}
Language Preference: ${language}
Content Tone: ${tone}

Create exactly in this format:

TITLES:
1. [First title]
2. [Second title]  
3. [Third title]
4. [Fourth title]

DESCRIPTION:
[Write a 150-200 word SEO optimized description with keywords, hashtags, and call-to-action. Consider the target audience: ${targetAudience}, use ${language} as primary language, and maintain a ${tone} tone.]

TAGS:
[Provide exactly 20 trending, SEO-friendly tags separated by commas]

Requirements:
- Target audience: ${targetAudience}
- Primary language: ${language}
- Tone: ${tone}
- Keep titles under 60 characters and clickable
- Include trending keywords and hashtags
- Make description engaging with call-to-action
- Tags should cover main topic + related trending terms
      `;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyB27VoFVRbKbpKDPrsSK2fDCcwiRNyfZFc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{ text: prompt }]
          }]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        const msg = (data as any)?.error?.message || 'Failed to generate content';
        throw new Error(msg);
      }

      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      // Parse the generated content
      const parsedContent = parseGeneratedContent(generatedText);
      
      const newContent: SEOContent = {
        ...parsedContent,
        timestamp: new Date(),
        topic: topic
      };

      setSeoContent(newContent);
      
      // Add to history and keep only recent entries (within 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      setHistory(prev => {
        const updatedHistory = [newContent, ...prev];
        return updatedHistory.filter(item => item.timestamp > sevenDaysAgo);
      });
      
      toast.success('✅ SEO Pack Generated & Saved to History!');

    } catch (error) {
      console.error('Error:', error);
      const message = (error as any)?.message || 'Failed to generate content. Please try again.';
      toast.error(message);
    }

    setIsLoading(false);
  };

  const parseGeneratedContent = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    
    let titles: string[] = [];
    let description = '';
    let tags: string[] = [];
    
    let currentSection = '';
    
    for (const line of lines) {
      if (line.includes('TITLES:')) {
        currentSection = 'titles';
        continue;
      } else if (line.includes('DESCRIPTION:')) {
        currentSection = 'description';
        continue;
      } else if (line.includes('TAGS:')) {
        currentSection = 'tags';
        continue;
      }
      
      if (currentSection === 'titles' && line.match(/^\d+\./)) {
        titles.push(line.replace(/^\d+\.\s*/, '').trim());
      } else if (currentSection === 'description' && line.trim()) {
        description += line.trim() + ' ';
      } else if (currentSection === 'tags' && line.trim()) {
        const tagLine = line.replace(/^\[|\]$/g, '');
        tags = tagLine.split(',').map(tag => tag.trim()).filter(tag => tag);
      }
    }

    return { titles, description: description.trim(), tags };
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  const loadFromHistory = (content: SEOContent) => {
    setSeoContent(content);
    setTopic(content.topic);
  };

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Youtube className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
            YouTube SEO Expert
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
          Generate SEO-optimized titles, descriptions, and tags for your YouTube videos using AI
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Content Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
          <div>
            <label className="text-sm sm:text-base font-medium mb-2 block">
              Video Topic *
            </label>
            <Textarea
              placeholder="Describe your video topic (e.g., 'How to cook authentic Italian pasta at home')"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="min-h-[150px] sm:min-h-[200px] resize-none text-lg p-4 rounded-lg"
            />
            <div className="text-xs text-muted-foreground mt-1">
              {topic.length}/200 characters
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm sm:text-base font-medium mb-2 block">
                Target Audience
              </label>
              <Select value={targetAudience} onValueChange={setTargetAudience}>
                <SelectTrigger className="h-14 text-lg p-4 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Beginners">Beginners</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Kids">Kids</SelectItem>
                  <SelectItem value="Teens">Teens</SelectItem>
                  <SelectItem value="Adults">Adults</SelectItem>
                  <SelectItem value="Professionals">Professionals</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm sm:text-base font-medium mb-2 block">
                Language
              </label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="h-14 text-lg p-4 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Bengali">Bengali</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Mixed">Mixed (Multi-language)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm sm:text-base font-medium mb-2 block">
              Tone
            </label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="h-14 text-lg p-4 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Educational">Educational</SelectItem>
                <SelectItem value="Entertaining">Entertaining</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Casual">Casual</SelectItem>
                <SelectItem value="Motivational">Motivational</SelectItem>
                <SelectItem value="Funny">Funny</SelectItem>
              </SelectContent>
            </Select>
          </div>

          
          <Button 
            onClick={generateSEOContent} 
            disabled={isLoading}
            className="w-full h-14 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isLoading ? (
              <>
                <Search className="w-4 h-4 mr-2 animate-spin" />
                Generating Content...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate SEO Pack
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {seoContent && (
        <Tabs defaultValue="content" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 h-12">
            <TabsTrigger value="content" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Youtube className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Generated Content</span>
              <span className="sm:hidden">Content</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <History className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">History ({history.length})</span>
              <span className="sm:hidden">History ({history.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4 sm:space-y-6">
            {/* Titles */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                    <span className="text-sm sm:text-base">SEO-Friendly Titles</span>
                  </span>
                  <Badge variant="secondary" className="text-xs">{seoContent.titles.length} titles</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {seoContent.titles.map((title, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl min-h-[100px] border border-border/50">
                    <span className="flex-1 text-lg leading-relaxed font-medium">{title}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(title, 'Title')}
                      className="h-10 w-10 p-0 flex-shrink-0 rounded-lg hover:bg-background"
                    >
                      <Copy className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    <span className="text-sm sm:text-base">Optimized Description</span>
                  </span>
                  <Badge variant="secondary" className="text-xs">{seoContent.description.split(' ').length} words</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Textarea
                    value={seoContent.description}
                    readOnly
                    className="min-h-[140px] resize-none text-lg p-4 rounded-xl border-2 border-border/50"
                  />
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(seoContent.description, 'Description')}
                    className="w-full h-12 text-lg font-medium rounded-lg"
                  >
                    <Copy className="w-5 h-5 mr-2" />
                    Copy Description
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                  <span className="flex items-center gap-2">
                    <Hash className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                    <span className="text-sm sm:text-base">Trending Tags</span>
                  </span>
                  <Badge variant="secondary" className="text-xs">{seoContent.tags.length} tags</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3 min-h-[120px] p-4 bg-muted/30 rounded-xl border border-border/50">
                    {seoContent.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-base py-2 px-4 font-medium rounded-lg">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(seoContent.tags.join(', '), 'Tags')}
                    className="w-full h-12 text-lg font-medium rounded-lg"
                  >
                    <Copy className="w-5 h-5 mr-2" />
                    Copy All Tags
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <History className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Generation History</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {history.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm sm:text-base">No history yet. Generate some content to see it here!</p>
                  </div>
                ) : (
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      {history.map((item, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <h4 className="font-medium text-sm sm:text-base line-clamp-2">{item.topic}</h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground flex-shrink-0">
                              <Clock className="w-3 h-3" />
                              <span className="whitespace-nowrap">
                                {item.timestamp.toLocaleDateString()} {item.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                            {item.titles[0]}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => loadFromHistory(item)}
                            className="w-full h-10 text-sm sm:text-base"
                          >
                            Load This Content
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default YouTubeSEOExpert;