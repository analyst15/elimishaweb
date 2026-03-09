"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";

import { useRef } from "react";

type Props = {
  value?: string;
  onChange?: (content: string) => void;
};

export default function BlogEditor({ value = "", onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,

      Placeholder.configure({
        placeholder: "Write your blog content...",
      }),

      Image.configure({
        inline: false,
      }),
    ],

    content: value,

    // Fix SSR hydration
    immediatelyRender: false,

    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  // ✅ Upload to Cloudinary
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file || !editor) return;

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const cloudName =
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.secure_url) {
        throw new Error("Upload failed");
      }

      // Insert into editor
      editor
        .chain()
        .focus()
        .setImage({ src: data.secure_url })
        .run();
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      alert("Image upload failed");
    }
  };

  if (!editor) return null;

  return (
    <div className="border rounded-lg bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b p-2">

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="btn-editor"
        >
          Bold
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="btn-editor"
        >
          Italic
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="btn-editor"
        >
          H2
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className="btn-editor"
        >
          List
        </button>

        {/* Image Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="btn-editor"
        >
          Image
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="p-4 min-h-[300px] prose max-w-none focus:outline-none"
      />
    </div>
  );
}