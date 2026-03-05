"use client";

import type { Post } from "@/types";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import {
  Pencil,
  Trash2,
  Calendar,
  Eye,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFirestore, deleteDocumentNonBlocking } from "@/firebase";
import { doc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Badge } from "@/components/ui/badge";

interface AdminPostCardProps {
  post: Post;
}

export function AdminPostCard({ post }: AdminPostCardProps) {
  const firestore = useFirestore();
  const { toast } = useToast();

  const handleDelete = () => {
    if (!firestore) return;

    const postRef = doc(firestore, "posts", post.id);

    deleteDocumentNonBlocking(postRef);

    toast({
      title: "Post deleted",
      description: "The post has been successfully removed.",
    });
  };

  return (
    <Card className="group transition hover:shadow-md hover:bg-accent/5">

      <CardContent className="p-4 sm:p-5">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* Left Content */}
          <div className="flex min-w-0 items-start gap-3">

            {/* Icon */}
            <div className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <FileText className="h-5 w-5" />
            </div>

            {/* Text */}
            <div className="min-w-0 space-y-1">

              {/* Title */}
              <div className="flex flex-wrap items-center gap-2">

                <h3 className="truncate text-base sm:text-lg font-semibold leading-tight">
                  {post.title}
                </h3>

                {!post.isPublished && (
                  <Badge
                    variant="secondary"
                    className="text-xs"
                  >
                    Draft
                  </Badge>
                )}

              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">

                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {format(
                    new Date(post.createdAt),
                    "MMM d, yyyy"
                  )}
                </span>

                <span className="hidden sm:inline">•</span>

                <span>
                  {post.authorName || "Anonymous"}
                </span>

              </div>

            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-1 sm:gap-2">

            {/* View */}
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              title="View Post"
            >
              <Link href={`/media/blog/${post.slug}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>

            {/* Edit */}
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              title="Edit Post"
            >
              <Link href={`/admin/edit/${post.slug}`}>
                <Pencil className="h-4 w-4" />
              </Link>
            </Button>

            {/* Delete */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  title="Delete Post"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>

                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Delete Post?
                  </AlertDialogTitle>

                  <AlertDialogDescription>
                    This will permanently remove "
                    {post.title}".
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>

                  <AlertDialogCancel>
                    Cancel
                  </AlertDialogCancel>

                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>

                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </div>
        </div>

      </CardContent>
    </Card>
  );
}