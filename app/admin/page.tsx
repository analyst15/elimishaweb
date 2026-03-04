"use client";

import { useFirestore, useCollection, useMemoFirebase, useUser } from "@/firebase";
import { collection, query } from "firebase/firestore";
import { AdminPostCard } from "@/components/AdminPostCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, Loader2, LogIn, Lock } from "lucide-react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "@/firebase";
import type { Post } from "@/types";

// This list should match the one in firestore.rules
const AUTHORIZED_EMAILS = [
  "techanalyst41@gmail.com",
  "alexokeyo15@gmail.com",
];

export default function AdminDashboardPage() {
  const auth = useAuth();
  const { user, isUserLoading: isAuthLoading } = useUser();
  const firestore = useFirestore();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const isAuthorized =
    user && user.email && AUTHORIZED_EMAILS.includes(user.email);

  const postsQuery = useMemoFirebase(() => {
    if (!firestore || isAuthLoading || !isAuthorized) return null;
    return query(collection(firestore, "posts"));
  }, [firestore, isAuthLoading, isAuthorized]);

  const { data: rawPosts, isLoading: isPostsLoading } =
    useCollection<Post>(postsQuery);

  const posts = rawPosts?.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  /* ===============================
     Loading State
  =============================== */
  if (isAuthLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  /* ===============================
     Not Logged In
  =============================== */
  if (!user || user.isAnonymous) {
    return (
      <div className="container mx-auto max-w-md px-4 py-24">
        <div className="flex flex-col items-center gap-6 text-center">

          <div className="rounded-full bg-primary/10 p-6">
            <LogIn className="h-12 w-12 text-primary" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Editor Access</h1>
            <p className="text-muted-foreground">
              Sign in with an authorized account to manage posts.
            </p>
          </div>

          <Button onClick={handleLogin} size="lg" className="w-full sm:w-auto">
            <LogIn className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>

        </div>
      </div>
    );
  }

  /* ===============================
     Unauthorized
  =============================== */
  if (!isAuthorized) {
    return (
      <div className="container mx-auto max-w-md px-4 py-24">
        <div className="flex flex-col items-center gap-6 text-center">

          <div className="rounded-full bg-destructive/10 p-6">
            <Lock className="h-12 w-12 text-destructive" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-destructive">
              Access Denied
            </h1>

            <p className="text-muted-foreground">
              <span className="font-medium">{user.email}</span> is not authorized.
            </p>
          </div>

          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/media/blog">Return to Blog</Link>
          </Button>

        </div>
      </div>
    );
  }

  /* ===============================
     Main Dashboard
  =============================== */
  return (
    <div className="container mx-auto max-w-7xl px-4 py-24 space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Editor Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your blog posts and drafts
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">

          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/media/blog">View Blog</Link>
          </Button>

          <Button asChild className="w-full sm:w-auto">
            <Link href="/admin/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Post
            </Link>
          </Button>

        </div>
      </div>

      {/* Content */}
      {isPostsLoading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : posts && posts.length > 0 ? (

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <AdminPostCard key={post.id} post={post} />
          ))}
        </div>

      ) : (
        <div className="rounded-lg border-2 border-dashed bg-card/50 py-24 text-center">

          <p className="mb-4 text-muted-foreground">
            You haven't created any posts yet.
          </p>

          <Button asChild variant="secondary">
            <Link href="/admin/create">Create Your First Post</Link>
          </Button>

        </div>
      )}

    </div>
  );
}