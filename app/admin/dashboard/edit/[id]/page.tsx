"use client";

import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts
  const fetchPosts = async () => {

    const snap = await getDocs(collection(db, "posts"));

    const data = snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPosts(data);
    setLoading(false);
  };

  // Delete post
  const deletePost = async (id: string) => {

    if (!confirm("Delete this post permanently?")) return;

    await deleteDoc(doc(db, "posts", id));

    fetchPosts(); // Refresh
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <main className="max-w-6xl mx-auto py-20 px-4">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">Manage Blog</h1>

        <Link
          href="/admin/dashboard/new"
          className="bg-teal-600 text-white px-5 py-2 rounded"
        >
          + New Post
        </Link>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full border">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Author</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Actions</th>
            </tr>

          </thead>

          <tbody>

            {posts.map(post => (

              <tr key={post.id}>

                <td className="p-3 border">{post.title}</td>

                <td className="p-3 border">{post.author}</td>

                <td className="p-3 border">
                  {post.createdAt?.toDate().toLocaleDateString()}
                </td>

                <td className="p-3 border space-x-3">

                  <Link
                    href={`/admin/dashboard/edit/${post.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deletePost(post.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}