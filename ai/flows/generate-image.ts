'use server';
/**
 * @fileOverview AI-powered image generation for blog post covers.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('The prompt to generate an image from.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateCoverImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/imagen-3.0-generate-001',
      prompt: `A beautiful, high-quality, professional blog cover image representing: ${input.prompt}. Minimalist, modern style, vibrant colors.`,
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate image');
    }

    return {
      imageUrl: media.url,
    };
  }
);
