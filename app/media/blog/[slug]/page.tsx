
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import { notFound, useParams } from 'next/navigation';
import { Tag } from '@/components/Tag';
import { format } from 'date-fns';
import { 
  Calendar, 
  Clock, 
  User, 
  ChevronLeft, 
  Loader2, 
  Facebook, 
  Twitter, 
  Linkedin,
  Share2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import type { Post } from '@/types';
import { useEffect, useState } from 'react';
import images from '@/lib/placeholder-images.json';

export default function PostReadingPage() {
  const { slug } = useParams();
  const firestore = useFirestore();
  const [currentUrl, setCurrentUrl] = useState('');

  const postQuery = useMemoFirebase(() => {
    if (!firestore || !slug) return null;
    return query(collection(firestore, 'posts'), where('slug', '==', slug), limit(1));
  }, [firestore, slug]);

  const { data: posts, isLoading } = useCollection<Post>(postQuery);
  const post = posts?.[0];

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | The Daily Ink`;
    }
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, [post]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isLoading && posts !== null && posts.length === 0) {
    notFound();
  }

  if (!post) return null;

  const getFirstImage = (html: string) => {
    const match = html.match(/<img [^>]*src="([^"]+)"/);
    return match ? match[1] : null;
  };

  const featuredImage = post.imageUrl || getFirstImage(post.content) || images.blogHero.url;
  const plainText = post.content.replace(/<[^>]*>?/gm, '');
  const readingTime = Math.ceil(plainText.split(' ').length / 200);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: <Facebook size={18} />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      color: 'hover:text-[#1877F2]'
    },
    {
      name: 'Twitter',
      icon: <Twitter size={18} />,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`,
      color: 'hover:text-[#1DA1F2]'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={18} />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      color: 'hover:text-[#0A66C2]'
    }
  ];

  return (
    <article className="container mx-auto px-4 pt-32 pb-16 max-w-4xl">
      <div className="mb-8 max-w-3xl mx-auto">
        <Button asChild variant="ghost" size="sm" className="-ml-4 text-muted-foreground hover:text-primary transition-colors">
          <Link href="/media/blog">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Stories
          </Link>
        </Button>
      </div>

      <div className="max-w-3xl mx-auto">
        <header className="mb-12 flex flex-col gap-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-x-8 gap-y-3 text-sm text-muted-foreground flex-wrap border-y py-4 border-border/50">
              <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User size={16} />
                  </div>
                  <span className="font-semibold text-foreground">{post.authorName || 'Anonymous'}</span>
              </div>
              <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  <time dateTime={post.createdAt}>{format(new Date(post.createdAt), 'MMMM d, yyyy')}</time>
              </div>
              <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  <span>{readingTime} min read</span>
              </div>
          </div>
        </header>

        <div 
          className="prose prose-invert prose-lg max-w-none 
            prose-headings:font-headline prose-headings:tracking-tight
            prose-p:text-foreground/80 prose-p:leading-relaxed
            prose-img:rounded-3xl prose-img:shadow-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="mt-16 pt-12 border-t border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div className="flex flex-wrap gap-2">
            {post.tags && post.tags.length > 0 ? (
              post.tags.map(tag => (
                <Tag key={tag} tag={tag} />
              ))
            ) : (
              <Tag tag="Story" />
            )}
          </div>

          <div className="flex items-center gap-4 bg-muted/30 px-6 py-3 rounded-full border border-border/50 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Share2 size={14} className="text-primary" />
              Share
            </span>
            <div className="h-4 w-px bg-border/50 mx-1" />
            <div className="flex items-center gap-4">
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-muted-foreground transition-all duration-200 hover:scale-110 ${link.color}`}
                  title={`Share on ${link.name}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
