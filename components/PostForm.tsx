'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useFirestore, useUser, addDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase';
import { doc, collection } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ChevronLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';
import type { Post } from '@/types';
import { serverTimestamp } from 'firebase/firestore';

const RichTextEditor = dynamic(
  () => import('./RichTextEditor').then((mod) => mod.RichTextEditor),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full rounded-md" />
  }
);

const PostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  content: z.string().min(10, 'Content must be at least 10 characters.'),
});

type PostFormData = z.infer<typeof PostSchema>;

interface PostFormProps {
  post?: Post;
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const firestore = useFirestore();
  const { user: currentUser } = useUser();
  const isEditing = !!post;
  const { toast } = useToast();

  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<PostFormData>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
    },
  });

  const onSubmit = async (data: PostFormData) => {
    if (!firestore || !currentUser) {
      toast({ 
        title: 'Error', 
        description: 'You must be signed in to post.', 
        variant: 'destructive' 
      });
      return;
    }
    
    setIsSaving(true);
    const slug = slugify(data.title);

    try {
      if (isEditing && post) {
        const postRef = doc(firestore, 'posts', post.id);
        updateDocumentNonBlocking(postRef, {
          title: data.title,
          content: data.content,
          slug: slug,
          updatedAt: new Date().toISOString(),
        });
        toast({ title: 'Success', description: 'Post updated successfully!' });
      } else {
        const postsRef = collection(firestore, 'posts');
        addDocumentNonBlocking(postsRef, {
          title: data.title,
          content: data.content,
          slug: slug,
          createdAt: new Date().toISOString(),
          isPublished: true,
          authorId: currentUser.uid,
          authorName: currentUser.displayName || 'Anonymous Author',
        });
        toast({ title: 'Success', description: 'Post published successfully!' });
      }
      router.push('/admin');
    } catch (error) {
      console.error(error);
      toast({ 
        title: 'Error', 
        description: 'An unexpected error occurred.', 
        variant: 'destructive' 
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4 pb-20">
      <Button asChild variant="ghost" size="sm" className="-ml-4 text-muted-foreground">
        <Link href="/admin">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            {isEditing ? 'Edit Post' : 'Post Details'}
          </CardTitle>
          <CardDescription>
            {isEditing ? 'Make adjustments to your post.' : 'Start writing your next insight.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...form.register('title')} placeholder="Enter a catchy title..." />
              {form.formState.errors.title && <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Controller
                name="content"
                control={form.control}
                render={({ field }) => (
                  <RichTextEditor 
                    value={field.value} 
                    onChange={field.onChange} 
                    placeholder="Tell your story..."
                  />
                )}
              />
              {form.formState.errors.content && <p className="text-sm text-destructive">{form.formState.errors.content.message}</p>}
            </div>
            
            <div className="flex justify-end pt-4 border-t">
              <Button type="submit" disabled={isSaving || !currentUser} size="lg">
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {!currentUser ? 'Please Sign In' : (isEditing ? 'Update Post' : 'Publish Post')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
