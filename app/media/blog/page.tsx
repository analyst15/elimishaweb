'use client';

import { useFirestore, useCollection, useMemoFirebase, useUser, useAuth } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { PostCard } from '@/components/PostCard';
import { Loader2, PenTool, LayoutDashboard, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AuthDialog } from '@/components/AuthDialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import type { Post } from '@/types';

export default function BlogListPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const firestore = useFirestore();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const postsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'posts'));
  }, [firestore]);

  const { data: posts, isLoading } = useCollection<Post>(postsQuery);

  const publishedPosts = posts
    ?.filter(post => post.isPublished)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!hasMounted) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-16 min-h-screen">
        <div className="flex justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  const isEditor = user && !user.isAnonymous;

  return (
    <div className="container mx-auto px-4 pt-32 pb-16 space-y-12 max-w-7xl">
      <header className="text-center py-16 border-b border-dashed border-primary/20">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-primary">
          The Daily Ink
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Creative perspectives, intellectual deep-dives, and stories that matter.
        </p>
      </header>
      
      <main>
        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : publishedPosts && publishedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {publishedPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <section className="text-center py-24 border-dashed border-2 rounded-lg bg-card/50">
            <h2 className="text-2xl font-semibold">The ink is still drying.</h2>
            <p className="text-muted-foreground mt-2">Check back soon for our first stories!</p>
          </section>
        )}
      </main>

      {/* Creative Editor Section at the bottom of the blog page */}
      <section className="mt-32 pt-24 border-t border-dashed border-primary/20">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-2">
            <PenTool size={32} />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-headline font-bold">The Editor's Desk</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our newsroom is powered by intellectual curiosity. If you're an authorized contributor, 
              step into the editor's lounge to manage the narrative.
            </p>
          </div>

          <div className="pt-6">
            {isUserLoading ? (
              <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
            ) : isEditor ? (
              <div className="flex flex-col items-center gap-6 p-8 rounded-[2rem] bg-card border border-border/50 shadow-xl">
                <div className="flex items-center gap-4 text-left">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                    {user.displayName?.charAt(0) || <User />}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{user.displayName}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href="/admin">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button onClick={handleLogout} variant="ghost" className="rounded-full text-destructive hover:text-destructive hover:bg-destructive/10">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <AuthDialog />
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50">
                  Restricted access for authorized staff only
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
