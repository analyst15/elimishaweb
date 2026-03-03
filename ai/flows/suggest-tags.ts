// src/ai/flows/suggest-tags.ts
'use server';
/**
 * @fileOverview AI-powered tag suggestion for blog posts.
 *
 * This file defines a Genkit flow that suggests relevant tags for a given blog post content.
 * It exports:
 * - `suggestTags`: The main function to trigger the tag suggestion flow.
 * - `SuggestTagsInput`: The input type for the `suggestTags` function.
 * - `SuggestTagsOutput`: The output type for the `suggestTags` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTagsInputSchema = z.object({
  blogPostContent: z
    .string()
    .describe('The content of the blog post for which tags are to be suggested.'),
});
export type SuggestTagsInput = z.infer<typeof SuggestTagsInputSchema>;

const SuggestTagsOutputSchema = z.object({
  suggestedTags: z
    .array(z.string())
    .describe('An array of suggested tags for the blog post.'),
});
export type SuggestTagsOutput = z.infer<typeof SuggestTagsOutputSchema>;

export async function suggestTags(input: SuggestTagsInput): Promise<SuggestTagsOutput> {
  return suggestTagsFlow(input);
}

const suggestTagsPrompt = ai.definePrompt({
  name: 'suggestTagsPrompt',
  input: {schema: SuggestTagsInputSchema},
  output: {schema: SuggestTagsOutputSchema},
  prompt: `You are an expert in content categorization and tagging.
  Based on the content of the blog post provided, suggest relevant tags that would help users discover the content.
  Return ONLY the tags and nothing else.
  Blog Post Content: {{{blogPostContent}}}`,
});

const suggestTagsFlow = ai.defineFlow(
  {
    name: 'suggestTagsFlow',
    inputSchema: SuggestTagsInputSchema,
    outputSchema: SuggestTagsOutputSchema,
  },
  async input => {
    const {output} = await suggestTagsPrompt(input);
    return output!;
  }
);
