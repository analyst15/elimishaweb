import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

export default async function BlogPage() {

  const snap = await getDocs(collection(db, "posts"));

  const posts = snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return (
    <main className="max-w-7xl mx-auto py-20 px-4">

      <h1 className="text-4xl font-bold mb-10">Blog</h1>

      <div className="grid md:grid-cols-3 gap-8">

        {posts.map((post: any) => (
          <Link
            key={post.id}
            href={`/media/blog/${post.slug}`}
            className="border rounded-xl overflow-hidden hover:shadow-lg"
          >

            <img
              src={post.image}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">

              <h3 className="font-bold text-lg">
                {post.title}
              </h3>

            </div>

          </Link>
        ))}

      </div>

    </main>
  );
}