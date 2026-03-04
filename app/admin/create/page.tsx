'use client';

import { PostForm } from '@/components/PostForm';
import { useUser } from '@/firebase';
import { Loader2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const AUTHORIZED_EMAILS = [
  "techanalyst41@gmail.com",
  "alexokeyo15@gmail.com",
];

export default function AdminCreatePage() {
  const { user, isUserLoading } = useUser();
  const isAuthorized = user && user.email && AUTHORIZED_EMAILS.includes(user.email);

  if (isUserLoading) {
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
        <p className="text-muted-foreground">You do not have permission to create posts.</p>
        <Button asChild variant="outline">
          <Link href="/admin">Go to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-4xl font-headline font-bold mb-8">Create New Post</h1>
      <PostForm />
    </div>
  );
}
