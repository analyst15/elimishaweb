"use client";

import { useAdminAuth } from "@/lib/useAdminAuth";
import { db } from "@/lib/firebase";

import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPost() {
  const { loading: authLoading } = useAdminAuth();
  const router = useRouter();
  const params = useParams();

  const postId = params.id as string;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Fetch post
  const fetchPost = async () => {
    const ref = doc(db, "posts", postId);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      alert("Post not found");
      router.push("/admin/dashboard");
      return;
    }

    const data = snap.data();

    setTitle(data.title || "");
    setAuthor(data.author || "");
    setContent(data.content || "");
    setImageUrl(data.imageUrl || "");

    setLoading(false);
  };

  useEffect(() => {
    if (!authLoading && postId) {
      fetchPost();
    }
  }, [authLoading, postId]);

  // Upload image
  const uploadImage = async () => {
    if (!imageFile) return imageUrl;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", imageFile);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setUploading(false);

    if (!res.ok) {
      throw new Error(data.error);
    }

    return data.url;
  };

  // Update post
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);

      const finalImageUrl = await uploadImage();

      await updateDoc(doc(db, "posts", postId), {
        title,
        author,
        content,
        imageUrl: finalImageUrl,
        updatedAt: serverTimestamp(),
      });

      alert("Post updated");
      router.push("/admin/dashboard");

    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return <p className="p-10">Loading...</p>;
  }

  return (
    <main className="max-w-3xl mx-auto py-20 px-4">

      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>

      <form
        onSubmit={handleUpdate}
        className="space-y-5 bg-white p-6 shadow rounded"
      >

        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border p-3 rounded"
          required
        />

        {/* Author */}
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          className="w-full border p-3 rounded"
        />

        {/* Image Preview */}
        {imageUrl && (
          <img
            src={imageUrl}
            className="w-full h-60 object-cover rounded"
          />
        )}

        {/* Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImageFile(e.target.files?.[0] || null)
          }
        />

        {uploading && (
          <p className="text-sm text-gray-500">Uploading...</p>
        )}

        {/* Content */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-3 rounded h-48"
          required
        />

        {/* Submit */}
        <button
          disabled={saving || uploading}
          className="bg-teal-600 text-white px-6 py-2 rounded"
        >
          {saving ? "Saving..." : "Update Post"}
        </button>

      </form>

    </main>
  );
}