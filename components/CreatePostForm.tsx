
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState, useTransition } from 'react';
import dynamic from 'next/dynamic';
import { createPostAction, suggestTagsAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, TagIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';

const RichTextEditor = dynamic(
  () => import('./RichTextEditor').then((mod) => mod.RichTextEditor),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-[350px] w-full rounded-md" />
  }
);

const PostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  content: z.string().min(10, 'Content must be at least 10 characters.'),
  tags: z.string().optional(),
});

type PostFormData = z.infer<typeof PostSchema>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Publish Post
    </Button>
  );
}

export function CreatePostForm() {
  const [initialState, formAction] = useFormState(createPostAction, { message: null, errors: {} });
  const { toast } = useToast();

  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [isSuggesting, startSuggestionTransition] = useTransition();

  const form = useForm<PostFormData>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: '',
    },
  });

  const contentValue = form.watch('content');

  useEffect(() => {
    if (initialState?.message) {
      if (initialState.errors) {
        toast({
          title: 'Error',
          description: initialState.message,
          variant: 'destructive',
        });
      }
    }
  }, [initialState, toast]);

  const handleSuggestTags = () => {
    startSuggestionTransition(async () => {
      const plainText = contentValue.replace(/<[^>]*>?/gm, '');
      const tags = await suggestTagsAction(plainText);
      setSuggestedTags(tags);
    });
  };

  const addTag = (tag: string) => {
    const currentTags = form.getValues('tags');
    const tagsSet = new Set(currentTags ? currentTags.split(',').map(t => t.trim()) : []);
    if (!tagsSet.has(tag)) {
      tagsSet.add(tag);
      form.setValue('tags', Array.from(tagsSet).join(', '), { shouldValidate: true });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Post Details</CardTitle>
        <CardDescription>Fill out the form below to create your new masterpiece.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...form.register('title')} placeholder="Enter a catchy title..." />
            {initialState?.errors?.title && <p className="text-sm text-destructive">{initialState.errors.title[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Controller
              name="content"
              control={form.control}
              render={({ field }) => (
                <>
                  <RichTextEditor 
                    value={field.value} 
                    onChange={field.onChange} 
                    placeholder="Tell your story..."
                  />
                  <input type="hidden" name="content" value={field.value} />
                </>
              )}
            />
            {initialState?.errors?.content && <p className="text-sm text-destructive">{initialState.errors.content[0]}</p>}
          </div>

          <div className="space-y-4">
            <Label htmlFor="tags">Tags</Label>
             <div className="flex flex-col sm:flex-row gap-2">
              <Input id="tags" placeholder="e.g. tech, ai, philosophy" {...form.register('tags')} className="flex-grow"/>
              <Button type="button" variant="outline" onClick={handleSuggestTags} disabled={isSuggesting || contentValue.length < 50} className="sm:w-auto">
                {isSuggesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Suggest Tags
              </Button>
            </div>
            {initialState?.errors?.tags && <p className="text-sm text-destructive">{initialState.errors.tags[0]}</p>}
            
            {suggestedTags.length > 0 && (
                <div className="space-y-2 pt-2">
                    <p className="text-sm font-medium text-muted-foreground">AI Suggestions:</p>
                    <div className="flex flex-wrap gap-2">
                        {suggestedTags.map(tag => (
                            <button key={tag} type="button" onClick={() => addTag(tag)}>
                                <Badge variant="secondary" className="cursor-pointer hover:bg-accent hover:text-accent-foreground">
                                    <TagIcon className="mr-1 h-3 w-3" />
                                    {tag}
                                </Badge>
                            </button>
                        ))}
                    </div>
                </div>
            )}
          </div>
          
          <div className="flex justify-end pt-4 border-t">
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
