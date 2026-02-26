"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { db } from "@/lib/firebase";
import RichEditor from "@/components/RichEditor";

export default function NewPost() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // HTML content
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  /* ============================
     Upload to Cloudinary
  ============================ */
  const uploadImage = async () => {

    if (!image) return "";

    const form = new FormData();

    form.append("file", image);
    form.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: form,
      }
    );

    const data = await res.json();

    return data.secure_url;
  };

  /* ============================
     Create Post
  ============================ */
  const createPost = async () => {

    if (!title || !content) {
      alert("Title and content required");
      return;
    }

    setLoading(true);

    try {

      let imageUrl = "";

      if (image) {
        imageUrl = await uploadImage();
      }

      await addDoc(collection(db, "posts"), {
        title,
        slug: title.toLowerCase().replace(/\s+/g, "-"),
        content, // HTML
        image: imageUrl,
        createdAt: serverTimestamp(),
        author: "Admin",
      });

      alert("Post created!");

      setTitle("");
      setContent("");
      setImage(null);

    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }

    setLoading(false);
  };

  /* ============================
     UI
  ============================ */
  return (
    <main className="max-w-4xl mx-auto py-20 px-4">

      <h1 className="text-3xl font-bold mb-8">
        New Blog Post
      </h1>

      {/* Title */}
      <input
        placeholder="Title"
        className="w-full border p-3 mb-6"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      {/* Rich Editor */}
      <div className="mb-6">

        <label className="block font-medium mb-2">
          Content
        </label>

        <RichEditor
          value={content}
          onChange={setContent}
        />

      </div>

      {/* Image */}
      <input
        type="file"
        className="mb-6"
        onChange={e => setImage(e.target.files?.[0] || null)}
      />

      {/* Button */}
      <button
        onClick={createPost}
        disabled={loading}
        className="bg-teal-600 text-white px-6 py-3 rounded hover:bg-teal-700 disabled:opacity-50"
      >
        {loading ? "Publishing..." : "Publish"}
      </button>

    </main>
  );
}