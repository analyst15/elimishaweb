'use client';

import { useFirestore, useCollection, useMemoFirebase, useUser } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import { notFound, useParams } from 'next/navigation';
import { PostForm } from '@/components/PostForm';
import { Loader2, ShieldAlert, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Post } from '@/types';

const AUTHORIZED_EMAILS = [
  "techanalyst41@gmail.com",
  "alexokeyo15@gmail.com",
];

export default function AdminEditPage() {
  const { slug } = useParams();
  const { user, isUserLoading: isAuthLoading } = useUser();
  const firestore = useFirestore();

  const isAuthorized = user && user.email && AUTHORIZED_EMAILS.includes(user.email);

  const postQuery = useMemoFirebase(() => {
    if (!firestore || !slug || !isAuthorized) return null;
    return query(collection(firestore, 'posts'), where('slug', '==', slug), limit(1));
  }, [firestore, slug, isAuthorized]);

  const { data: posts, isLoading: isPostsLoading } = useCollection<Post>(postQuery);
  const post = posts?.[0];

  if (isAuthLoading || (isAuthorized && isPostsLoading)) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || user.isAnonymous || !isAuthorized) {
     return (
      <div className="text-center py-24 flex flex-col items-center gap-4">
        <Lock className="h-12 w-12 text-destructive" />
        <h1 className="text-2xl font-headline font-bold">Unauthorized</h1>
        <p className="text-muted-foreground">You do not have permission to edit posts.</p>
        <Button asChild variant="outline">
          <Link href="/admin">Go to Dashboard</Link>
        </Button>
      </div>
    );
  }

  if (posts !== null && posts.length === 0) {
    notFound();
  }

  if (!post) return null;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-4xl font-headline font-bold mb-8">Editing Story</h1>
      <PostForm post={post} />
    </div>
  );
}