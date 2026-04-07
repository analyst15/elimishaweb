export interface Post {
  authorEmail: string;
  id: string;
  slug: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
  authorId: string;
  authorName: string;
  isPublished: boolean;
  imageUrl?: string;
}
