'use client';

import React from 'react';
import { StaticPageLayout } from '@/components/marketing/StaticPageLayout';
import { Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FRONTEND_ROUTES } from '@/constants';
import { AdSenseUnit } from '@/components/shared/AdSenseUnit';

interface BlogArticleContainerProps {
  article: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    publishedAt: string;
    author: {
      name: string;
      role: string;
    };
    contentHtml: React.ReactNode;
  };
}

export const BlogArticleContainer = ({ article }: BlogArticleContainerProps) => {
  const handleShare = async () => {
    if (typeof window !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        // Suppress user cancellation
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Article link copied to clipboard!');
    }
  };

  return (
    <StaticPageLayout
      title={article.title}
      subtitle={article.excerpt}
      lastUpdated={`Published on ${article.publishedAt}`}
      className="max-w-3xl"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-border/50 text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            <User size={20} />
          </div>
          <div>
            <p className="font-bold text-foreground text-base">{article.author.name}</p>
            <p className="text-xs text-muted-foreground">{article.author.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-mono text-xs font-bold">
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-xs">
            <Clock size={14} />
            {article.readTime}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="rounded-full hover:bg-primary/10 text-primary"
            aria-label="Share article"
          >
            <Share2 size={16} />
          </Button>
        </div>
      </div>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        {article.contentHtml}
      </article>

      <AdSenseUnit className="my-10" />

      <div className="mt-12 pt-8 border-t border-border/50 flex items-center justify-between">
        <Link href={FRONTEND_ROUTES.BLOG}>
          <Button variant="outline" className="rounded-full gap-2">
            <ArrowLeft size={16} />
            Back to All Articles
          </Button>
        </Link>
        <Link href={FRONTEND_ROUTES.AUTH.SIGNUP}>
          <Button className="rounded-full bg-primary text-primary-foreground font-bold hover:brightness-110 shadow-lg shadow-primary/20">
            Join Kollabary Free
          </Button>
        </Link>
      </div>
    </StaticPageLayout>
  );
};
