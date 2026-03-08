import type { Post } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {

  /* Extract first image from HTML */
  const getFirstImage = (html: string) => {
    const match = html.match(/<img [^>]*src="([^"]+)"/);
    return match ? match[1] : null;
  };

  const featuredImage = getFirstImage(post.content);

  /* Remove HTML + create snippet */
  const snippet =
    post.content
      .replace(/<[^>]*>?/gm, '')
      .substring(0, 180) + '...';

  return (
    <article className="space-y-4 group">

      {/* Image */}
      {featuredImage && (
        <Link href={`/media/blog/${post.slug}`}>
          <div className="relative w-full h-[260px] md:h-[300px] overflow-hidden rounded-3xl">
            <Image
              src={featuredImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width:768px) 100vw, 50vw"
              priority={false}
            />
          </div>
        </Link>
      )}

      {/* Meta */}
      <div className="text-xs uppercase tracking-widest text-primary font-medium">
        Story · 1 Min Read
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold leading-snug hover:text-primary transition">
        <Link href={`/media/blog/${post.slug}`}>
          {post.title}
        </Link>
      </h2>

      {/* Author + Date */}
      <p className="text-sm text-muted-foreground">
        {post.authorName || 'Anonymous'} ·{" "}
        {format(new Date(post.createdAt), 'MMMM d, yyyy')}
      </p>

      {/* Excerpt */}
      <p className="text-muted-foreground leading-relaxed line-clamp-3">
        {snippet}
      </p>

      {/* Read more */}
      <Link
        href={`/media/blog/${post.slug}`}
        className="inline-flex items-center gap-1 text-primary font-medium hover:underline"
      >
        Read More →
      </Link>

    </article>
  );
}