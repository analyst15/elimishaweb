import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPost({ params }: Props) {

  // ✅ Await params
  const { slug } = await params;

  // Safety check
  if (!slug) {
    return <p className="p-10">Invalid blog link</p>;
  }

  // ✅ Query by slug
  const q = query(
    collection(db, "posts"),
    where("slug", "==", slug)
  );

  const snap = await getDocs(q);

  if (snap.empty) {
    return <p className="p-10">Post not found</p>;
  }

  const post = snap.docs[0].data();

  return (
    <main className="max-w-4xl mx-auto py-32 px-4">

      <h1 className="text-4xl font-bold mb-6">
        {post.title}
      </h1>

      {/* ✅ Image */}
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-80 object-cover rounded mb-8"
        />
      )}

      {/* ✅ Rich Content */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
      />

    </main>
  );
}