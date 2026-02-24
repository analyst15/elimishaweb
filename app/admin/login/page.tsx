"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">

      <div className="bg-white p-8 shadow-lg rounded-xl w-96">

        <h2 className="text-2xl font-bold mb-6">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-teal-600 text-white py-3 rounded"
        >
          Login
        </button>

      </div>

    </main>
  );
}