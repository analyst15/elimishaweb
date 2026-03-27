import { posts } from './data';
import type { Post } from '@/types';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export async function getPosts(): Promise<Post[]> {
  // In a real app, you would fetch this from a database
  return [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  // In a real app, you would fetch this from a database
  return posts.find(post => post.slug === slug);
}

export async function addPost(postData: Omit<Post, 'id' | 'slug' | 'createdAt'>): Promise<Post> {
  const newPost: Post = {
    id: Date.now().toString(),
    slug: slugify(postData.title),
    createdAt: new Date().toISOString(),
    ...postData,
  };
  
  // In a real app, you would insert this into a database
  // Ensure slug is unique
  const existingPost = await getPostBySlug(newPost.slug);
  if (existingPost) {
    newPost.slug = `${newPost.slug}-${Math.random().toString(36).substring(2, 7)}`;
  }
  
  posts.unshift(newPost); // Add to the beginning of the array
  return newPost;
}

export async function updatePost(id: string, postData: Partial<Omit<Post, 'id' | 'createdAt'>>): Promise<Post | undefined> {
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return undefined;
  
  const oldPost = posts[index];
  const updatedPost: Post = {
    ...oldPost,
    ...postData,
  };

  if (postData.title && postData.title !== oldPost.title) {
    let newSlug = slugify(postData.title);
    // Check if new slug exists and is not the current one
    const existing = posts.find(p => p.slug === newSlug && p.id !== id);
    if (existing) {
      newSlug = `${newSlug}-${Math.random().toString(36).substring(2, 7)}`;
    }
    updatedPost.slug = newSlug;
  }

  posts[index] = updatedPost;
  return updatedPost;
}
