import React, { useState } from 'react';
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
      setHistory(prev => [newContent, ...prev.slice(0, 9)]); // Keep last 10
      toast.success('SEO content generated successfully!');

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
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Youtube className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
            YouTube SEO Expert
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
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
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Video Topic *
            </label>
            <Textarea
              placeholder="Describe your video topic (e.g., 'How to cook authentic Italian pasta at home')"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="min-h-[80px] resize-none"
            />
            <div className="text-xs text-muted-foreground mt-1">
              {topic.length}/200 characters
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Target Audience
              </label>
              <Select value={targetAudience} onValueChange={setTargetAudience}>
                <SelectTrigger>
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
              <label className="text-sm font-medium mb-2 block">
                Language
              </label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
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
            <label className="text-sm font-medium mb-2 block">
              Tone
            </label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
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
            className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white font-medium"
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Youtube className="w-4 h-4" />
              Generated Content
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              History ({history.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            {/* Titles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-500" />
                    SEO-Friendly Titles
                  </span>
                  <Badge variant="secondary">{seoContent.titles.length} titles</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {seoContent.titles.map((title, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="flex-1 text-sm">{title}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(title, 'Title')}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-500" />
                    Optimized Description
                  </span>
                  <Badge variant="secondary">{seoContent.description.split(' ').length} words</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Textarea
                    value={seoContent.description}
                    readOnly
                    className="min-h-[120px] resize-none"
                  />
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(seoContent.description, 'Description')}
                    className="w-full"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Description
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Hash className="w-5 h-5 text-purple-500" />
                    Trending Tags
                  </span>
                  <Badge variant="secondary">{seoContent.tags.length} tags</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {seoContent.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(seoContent.tags.join(', '), 'Tags')}
                    className="w-full"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy All Tags
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Generation History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No history yet. Generate some content to see it here!</p>
                  </div>
                ) : (
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      {history.map((item, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">{item.topic}</h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {item.timestamp.toLocaleDateString()} {item.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {item.titles[0]}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => loadFromHistory(item)}
                            className="w-full"
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