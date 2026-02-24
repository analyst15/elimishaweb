"use client";

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPost() {

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(""); // Cloudinary URL
  const [loading, setLoading] = useState(false);

  const createPost = async () => {

    if (!title || !content) {
      alert("Title and content are required");
      return;
    }

    setLoading(true);

    await addDoc(collection(db, "posts"), {
      title,
      slug: title.toLowerCase().replace(/ /g, "-"),
      content,
      image,
      createdAt: serverTimestamp(),
      author: "Admin",
      status: "published", // for future use
    });

    alert("Post published");

    router.push("/admin/dashboard");
  };

  return (
    <main className="max-w-4xl mx-auto py-20 px-4">

      <h1 className="text-3xl font-bold mb-8">
        Create New Post
      </h1>

      {/* Title */}
      <input
        placeholder="Post title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full border p-3 mb-4 rounded"
      />

      {/* Content */}
      <textarea
        placeholder="Post content"
        rows={10}
        value={content}
        onChange={e => setContent(e.target.value)}
        className="w-full border p-3 mb-4 rounded"
      />

      {/* Cloudinary Image URL */}
      <input
        placeholder="Paste Cloudinary image URL"
        value={image}
        onChange={e => setImage(e.target.value)}
        className="w-full border p-3 mb-4 rounded"
      />

      {/* Preview */}
      {image && (
        <img
          src={image}
          alt="Preview"
          className="h-40 mb-4 rounded object-cover"
        />
      )}

      {/* Button */}
      <button
        disabled={loading}
        onClick={createPost}
        className="bg-teal-600 text-white px-6 py-3 rounded disabled:opacity-50"
      >
        {loading ? "Publishing..." : "Publish"}
      </button>

    </main>
  );
}