"use client";

import { useAdminAuth } from "@/lib/useAdminAuth";
import { db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

import Link from "next/link";
import { useEffect, useState } from "react";

/* ================================
   Safe Date Formatter
================================ */
const formatDate = (createdAt: any) => {
  if (!createdAt) return "—";

  if (createdAt?.toDate) {
    return createdAt.toDate().toLocaleDateString();
  }

  if (createdAt instanceof Date) {
    return createdAt.toLocaleDateString();
  }

  if (typeof createdAt === "string") {
    return new Date(createdAt).toLocaleDateString();
  }

  return "—";
};

export default function Dashboard() {
  /* ================================
     Auth Protection
  ================================ */
  const { loading: authLoading } = useAdminAuth();

  /* ================================
     State
  ================================ */
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  /* ================================
     Fetch Posts
  ================================ */
  const fetchPosts = async () => {
    try {
      setLoading(true);

      const q = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc")
      );

      const snap = await getDocs(q);

      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  /* ================================
     Delete Post
  ================================ */
  const deletePost = async (id: string) => {
    if (!confirm("Delete this post permanently?")) return;

    try {
      setDeletingId(id);

      await deleteDoc(doc(db, "posts", id));

      await fetchPosts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete post.");
    } finally {
      setDeletingId(null);
    }
  };

  /* ================================
     Lifecycle
  ================================ */
  useEffect(() => {
    fetchPosts();
  }, []);

  /* ================================
     Loading States
  ================================ */
  if (authLoading) {
    return <p className="p-10">Checking authentication...</p>;
  }

  if (loading) {
    return <p className="p-10">Loading posts...</p>;
  }

  if (error) {
    return <p className="p-10 text-red-600">{error}</p>;
  }

  /* ================================
     UI
  ================================ */
  return (
    <main className="max-w-6xl mx-auto py-20 px-4">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Manage Blog
        </h1>

        <button
  onClick={() => signOut(auth)}
  className="text-red-600"
>
  Logout
</button>

        <Link
          href="/admin/dashboard/new"
          className="bg-teal-600 text-white px-5 py-2 rounded hover:bg-teal-700 transition"
        >
          + New Post
        </Link>

      </div>

      {/* Empty State */}
      {posts.length === 0 && (
        <p className="text-gray-600">
          No blog posts yet. Create your first one.
        </p>
      )}

      {/* Table */}
      {posts.length > 0 && (

        <div className="overflow-x-auto">

          <table className="w-full border text-sm">

            <thead className="bg-gray-100">

              <tr>
                <th className="p-3 border text-left">Title</th>
                <th className="p-3 border text-left">Author</th>
                <th className="p-3 border text-left">Date</th>
                <th className="p-3 border text-left">Actions</th>
              </tr>

            </thead>

            <tbody>

              {posts.map(post => (

                <tr key={post.id} className="hover:bg-gray-50">

                  <td className="p-3 border font-medium">
                    {post.title}
                  </td>

                  <td className="p-3 border">
                    {post.author || "Admin"}
                  </td>

                  <td className="p-3 border">
                    {formatDate(post.createdAt)}
                  </td>

                  <td className="p-3 border space-x-4">

                    <Link
                      href={`/admin/dashboard/edit/${post.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>

                    <button
                      disabled={deletingId === post.id}
                      onClick={() => deletePost(post.id)}
                      className="text-red-600 hover:underline disabled:opacity-50"
                    >
                      {deletingId === post.id ? "Deleting..." : "Delete"}
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </main>
  );
}