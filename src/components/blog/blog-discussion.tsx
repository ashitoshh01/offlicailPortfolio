"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/blog/google-icon";
import { AuthModal } from "@/components/blog/auth-modal";
import { DATA } from "@/data/resume";
import {
  MessageSquare,
  MessageSquareText,
  Heart,
  CornerDownRight,
  Trash2,
  Send,
  Loader2,
  LogIn,
  LogOut,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  X,
} from "lucide-react";

export interface CommentAuthor {
  uid: string;
  name: string;
  email?: string;
  photoURL?: string;
}

export interface CommentItem {
  id: string;
  postSlug: string;
  parentId: string | null;
  content: string;
  author: CommentAuthor;
  createdAt: Timestamp | { seconds: number; nanoseconds: number } | null | Date;
  likes?: string[];
}

interface BlogDiscussionProps {
  postSlug: string;
  postTitle?: string;
}

function formatRelativeTime(
  timestamp: Timestamp | { seconds: number; nanoseconds: number } | null | Date | undefined
): string {
  if (!timestamp) return "Just now";

  let date: Date;
  if (timestamp instanceof Date) {
    date = timestamp;
  } else if ("toDate" in timestamp && typeof (timestamp as Timestamp).toDate === "function") {
    date = (timestamp as Timestamp).toDate();
  } else if ("seconds" in timestamp && typeof timestamp.seconds === "number") {
    date = new Date(timestamp.seconds * 1000);
  } else {
    date = new Date();
  }

  const now = new Date();
  const diffInSeconds = Math.max(0, Math.floor((now.getTime() - date.getTime()) / 1000));

  if (diffInSeconds < 45) return "Just now";
  if (diffInSeconds < 90) return "1m ago";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

function getInitials(name?: string): string {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

const ADMIN_EMAIL = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "ashu@gmail.com").toLowerCase();

export function BlogDiscussion({ postSlug, postTitle }: BlogDiscussionProps) {
  const { user, loading: authLoading, error: authError, signOut, clearError } = useAuth();

  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL;

  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loadingComments, setLoadingComments] = useState<boolean>(true);
  const [dbError, setDbError] = useState<string | null>(null);

  // New root comment input
  const [rootInput, setRootInput] = useState<string>("");
  const [submittingRoot, setSubmittingRoot] = useState<boolean>(false);

  // Reply state: id of comment being replied to
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyInput, setReplyInput] = useState<string>("");
  const [submittingReply, setSubmittingReply] = useState<boolean>(false);

  // Action status (e.g. deleting/liking)
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  const replyTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Focus reply textarea when opened
  useEffect(() => {
    if (replyingToId && replyTextareaRef.current) {
      replyTextareaRef.current.focus();
    }
  }, [replyingToId]);

  // Real-time listener for this post's comments
  useEffect(() => {
    setLoadingComments(true);
    setDbError(null);

    const commentsRef = collection(db, "blog_discussions");
    const q = query(commentsRef, where("postSlug", "==", postSlug));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetched: CommentItem[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          fetched.push({
            id: doc.id,
            postSlug: data.postSlug,
            parentId: data.parentId ?? null,
            content: data.content ?? "",
            author: data.author ?? { uid: "anonymous", name: "Anonymous" },
            createdAt: data.createdAt ?? null,
            likes: Array.isArray(data.likes) ? data.likes : [],
          });
        });

        // Sort by createdAt ascending in JavaScript (prevents missing Firestore composite index error)
        fetched.sort((a, b) => {
          const timeA = a.createdAt && "seconds" in a.createdAt ? a.createdAt.seconds : 0;
          const timeB = b.createdAt && "seconds" in b.createdAt ? b.createdAt.seconds : 0;
          return timeA - timeB;
        });

        setComments(fetched);
        setLoadingComments(false);
      },
      (err) => {
        console.error("Discussion subscription error:", err);
        setDbError("Unable to load discussions right now. Please try again later.");
        setLoadingComments(false);
      }
    );

    return () => unsubscribe();
  }, [postSlug]);

  // Group comments: top-level vs replies
  const { rootComments, replyMap, totalCount } = useMemo(() => {
    const roots: CommentItem[] = [];
    const replies: Record<string, CommentItem[]> = {};

    comments.forEach((c) => {
      if (!c.parentId) {
        roots.push(c);
      } else {
        if (!replies[c.parentId]) {
          replies[c.parentId] = [];
        }
        replies[c.parentId].push(c);
      }
    });

    return {
      rootComments: roots,
      replyMap: replies,
      totalCount: comments.length,
    };
  }, [comments]);

  // Post a top-level comment
  const handlePostRoot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rootInput.trim()) return;

    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    setSubmittingRoot(true);
    setDbError(null);

    try {
      const activeUser = user!;
      await addDoc(collection(db, "blog_discussions"), {
        postSlug,
        parentId: null,
        content: rootInput.trim(),
        author: {
          uid: activeUser.uid,
          name: activeUser.displayName || "Anonymous User",
          email: activeUser.email || "",
          photoURL: activeUser.photoURL || "",
        },
        likes: [],
        createdAt: serverTimestamp(),
      });

      setRootInput("");
    } catch (err: unknown) {
      console.error("Error adding comment:", err);
      setDbError("Unable to post your question right now. Please try again.");
    } finally {
      setSubmittingRoot(false);
    }
  };

  // Post a reply to an existing comment
  const handlePostReply = async (parentId: string) => {
    if (!replyInput.trim()) return;

    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    setSubmittingReply(true);
    setDbError(null);

    try {
      const activeUser = user!;
      await addDoc(collection(db, "blog_discussions"), {
        postSlug,
        parentId,
        content: replyInput.trim(),
        author: {
          uid: activeUser.uid,
          name: activeUser.displayName || "Anonymous User",
          email: activeUser.email || "",
          photoURL: activeUser.photoURL || "",
        },
        likes: [],
        createdAt: serverTimestamp(),
      });

      setReplyInput("");
      setReplyingToId(null);
    } catch (err: unknown) {
      console.error("Error adding reply:", err);
      setDbError("Unable to post your reply right now. Please try again.");
    } finally {
      setSubmittingReply(false);
    }
  };

  // Toggle Like on comment
  const handleToggleLike = async (comment: CommentItem) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    const hasLiked = comment.likes?.includes(user.uid);
    setActionInProgress(`like-${comment.id}`);

    try {
      const commentRef = doc(db, "blog_discussions", comment.id);
      await updateDoc(commentRef, {
        likes: hasLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
      });
    } catch (err: unknown) {
      console.error("Error toggling like:", err);
    } finally {
      setActionInProgress(null);
    }
  };

  // Delete comment (User can delete their own; Admin ashu@gmail.com can delete any)
  const handleDeleteComment = async (commentId: string, isOtherUserComment = false) => {
    const confirmMessage = isOtherUserComment
      ? "Delete this message as Admin?"
      : "Are you sure you want to delete this message?";
    if (!window.confirm(confirmMessage)) return;

    setActionInProgress(`delete-${commentId}`);
    try {
      await deleteDoc(doc(db, "blog_discussions", commentId));
    } catch (err: unknown) {
      console.error("Error deleting comment:", err);
      setDbError("Unable to delete this message right now. Please try again.");
    } finally {
      setActionInProgress(null);
    }
  };

  // Check if comment author is the blog author
  const isPostAuthor = (commentAuthor: CommentAuthor) => {
    if (DATA.name && commentAuthor.name.toLowerCase() === DATA.name.toLowerCase()) {
      return true;
    }
    return false;
  };

  return (
    <section
      id="discussion-forum"
      className="mt-16 pt-10 border-t border-border/80 w-full font-sans transition-colors"
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <MessageSquare className="size-6 text-primary" />
              Discussion Forum
            </h2>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border">
              {totalCount} {totalCount === 1 ? "response" : "responses"}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Ask questions, discuss topics, or share your thoughts on{" "}
            <span className="font-medium text-foreground">{postTitle || "this post"}</span>.
          </p>
        </div>

        {/* Auth Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {authLoading ? (
            <div className="flex items-center gap-2 text-xs text-muted-foreground py-1 px-3 rounded-md bg-muted/40 animate-pulse">
              <Loader2 className="size-3.5 animate-spin" />
              <span>Checking session...</span>
            </div>
          ) : user ? (
            <div className="flex items-center gap-2.5 p-1 pl-2 pr-1.5 rounded-full border border-border/70 bg-card/60 shadow-xs">
              <Avatar className="size-6 ring-1 ring-border">
                {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || "User"} />}
                <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-bold">
                  {getInitials(user.displayName || user.email || "")}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-1.5 max-w-[110px] sm:max-w-[170px]">
                <span className="text-xs font-medium text-foreground truncate">
                  {user.displayName || user.email?.split("@")[0]}
                </span>
                {isAdmin && (
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30 shrink-0">
                    Admin
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="h-6 px-2 text-[11px] text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
                title="Sign Out"
              >
                <LogOut className="size-3 mr-1" />
                Logout
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAuthModalOpen(true)}
              className="h-8 px-3 text-xs font-medium gap-1.5 border-border/80 hover:bg-muted/80 hover:border-border transition-all shadow-xs rounded-lg"
            >
              <LogIn className="size-3.5" />
              Sign In
            </Button>
          )}
        </div>
      </div>

      {/* Friendly Notification Banner */}
      {(authError || dbError) && (
        <div className="mb-6 p-3.5 rounded-xl border border-destructive/25 bg-destructive/10 text-foreground text-xs sm:text-sm flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="size-4 shrink-0 text-destructive" />
            <p className="text-xs text-muted-foreground">{authError || dbError}</p>
          </div>
          <button
            onClick={() => {
              clearError();
              setDbError(null);
            }}
            className="text-muted-foreground hover:text-foreground p-1 transition-colors"
            title="Dismiss"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* Main Comment Box (Top Level) */}
      <div className="mb-8 rounded-2xl border border-border/70 bg-card p-4 sm:p-5 shadow-xs transition-all focus-within:border-primary/50 focus-within:shadow-md">
        <form onSubmit={handlePostRoot} className="space-y-3">
          <div className="flex items-start gap-3">
            <Avatar className="size-8 sm:size-9 ring-1 ring-border/80 shrink-0 mt-0.5">
              {user?.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || "User"} />}
              <AvatarFallback className="text-xs font-semibold bg-muted text-muted-foreground">
                {user ? getInitials(user.displayName || user.email || "") : "U"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <textarea
                value={rootInput}
                onChange={(e) => setRootInput(e.target.value)}
                placeholder={
                  user
                    ? "Ask a question, share an insight, or leave feedback..."
                    : "Sign in to join the discussion and ask questions..."
                }
                rows={3}
                className="w-full resize-none bg-transparent text-sm placeholder:text-muted-foreground/60 text-foreground outline-none transition-colors border-0 p-0 focus:ring-0"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 text-[11px]">
              <Sparkles className="size-3 text-primary/70" />
              Be kind, constructive, and respectful.
            </span>

            <div className="flex items-center gap-2">
              {user ? (
                <Button
                  type="submit"
                  size="sm"
                  disabled={!rootInput.trim() || submittingRoot}
                  className="h-8 px-4 rounded-lg font-medium gap-1.5 shadow-xs transition-all"
                >
                  {submittingRoot ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send className="size-3.5" />
                      Post Question
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setAuthModalOpen(true)}
                  className="h-8 px-3 rounded-lg font-medium gap-1.5 shadow-xs"
                >
                  <LogIn className="size-3.5" />
                  Sign In to Comment
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {loadingComments ? (
          <div className="space-y-4 py-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="p-4 rounded-xl border border-border/40 bg-card/40 space-y-3 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-muted" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3 w-28 bg-muted rounded" />
                    <div className="h-2.5 w-16 bg-muted/60 rounded" />
                  </div>
                </div>
                <div className="h-4 w-4/5 bg-muted/70 rounded" />
              </div>
            ))}
          </div>
        ) : rootComments.length === 0 ? (
          <div className="py-12 px-4 text-center rounded-2xl border border-dashed border-border/80 bg-muted/20">
            <div className="size-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-3">
              <MessageSquareText className="size-6" />
            </div>
            <h3 className="text-base font-semibold text-foreground">No discussions yet</h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto mt-1">
              Be the first to ask a query or share your thoughts on this topic!
            </p>
            {!user && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAuthModalOpen(true)}
                className="mt-4 gap-1.5 text-xs rounded-lg"
              >
                <LogIn className="size-3.5" />
                Sign in to start the discussion
              </Button>
            )}
          </div>
        ) : (
          rootComments.map((comment) => {
            const replies = replyMap[comment.id] || [];
            const isReplying = replyingToId === comment.id;
            const hasLiked = Boolean(user && comment.likes?.includes(user.uid));
            const likeCount = comment.likes?.length || 0;
            const isAuthor = user?.uid === comment.author.uid;
            const canDelete = isAuthor || isAdmin;
            const isCommentAdmin = (comment.author.email || "").toLowerCase() === ADMIN_EMAIL;

            return (
              <div
                key={comment.id}
                className="group/comment rounded-2xl border border-border/70 bg-card p-4 sm:p-5 shadow-xs transition-all hover:border-border"
              >
                {/* Comment Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="size-8 sm:size-9 ring-1 ring-border shrink-0">
                      {comment.author.photoURL && (
                        <AvatarImage src={comment.author.photoURL} alt={comment.author.name} />
                      )}
                      <AvatarFallback className="text-xs font-semibold bg-muted text-muted-foreground">
                        {getInitials(comment.author.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm font-semibold text-foreground leading-tight">
                          {comment.author.name}
                        </span>
                        {isCommentAdmin ? (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-semibold bg-amber-500/15 text-amber-500 border border-amber-500/30">
                            <ShieldCheck className="size-2.5" />
                            Admin
                          </span>
                        ) : isPostAuthor(comment.author) ? (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
                            <ShieldCheck className="size-2.5" />
                            Author
                          </span>
                        ) : null}
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        {formatRelativeTime(comment.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Actions: Delete if user's own comment OR if admin */}
                  {canDelete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteComment(comment.id, !isAuthor)}
                      disabled={actionInProgress === `delete-${comment.id}`}
                      className={`size-7 p-0 rounded-md opacity-80 group-hover/comment:opacity-100 transition-opacity ${
                        isAdmin && !isAuthor
                          ? "text-amber-500/90 hover:text-amber-500 hover:bg-amber-500/10"
                          : "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      }`}
                      title={isAdmin && !isAuthor ? "Delete comment (Admin privilege)" : "Delete comment"}
                    >
                      {actionInProgress === `delete-${comment.id}` ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="size-3.5" />
                      )}
                    </Button>
                  )}
                </div>

                {/* Comment Content */}
                <div className="mt-3 text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap pl-11">
                  {comment.content}
                </div>

                {/* Comment Footer: Likes & Reply */}
                <div className="mt-3 pl-11 flex items-center gap-3 text-xs text-muted-foreground">
                  <button
                    onClick={() => handleToggleLike(comment)}
                    disabled={actionInProgress === `like-${comment.id}`}
                    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors ${
                      hasLiked
                        ? "text-red-500 font-semibold bg-red-500/10"
                        : "hover:text-foreground hover:bg-muted/80"
                    }`}
                  >
                    <Heart className={`size-3.5 ${hasLiked ? "fill-current" : ""}`} />
                    <span>{likeCount > 0 ? likeCount : "Like"}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (!user) {
                        setAuthModalOpen(true);
                        return;
                      }
                      if (isReplying) {
                        setReplyingToId(null);
                        setReplyInput("");
                      } else {
                        setReplyingToId(comment.id);
                        setReplyInput("");
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md hover:text-foreground hover:bg-muted/80 transition-colors"
                  >
                    <CornerDownRight className="size-3.5" />
                    <span>Reply</span>
                    {replies.length > 0 && (
                      <span className="text-[10px] text-muted-foreground/80 font-mono">
                        ({replies.length})
                      </span>
                    )}
                  </button>
                </div>

                {/* Inline Reply Form */}
                {isReplying && (
                  <div className="mt-4 ml-6 sm:ml-11 p-3 rounded-xl border border-primary/20 bg-muted/30 animate-in fade-in-50 duration-200">
                    <div className="flex items-center justify-between pb-1.5 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground flex items-center gap-1">
                        <CornerDownRight className="size-3 text-primary" />
                        Replying to <span className="font-semibold">{comment.author.name}</span>
                      </span>
                      <button
                        onClick={() => {
                          setReplyingToId(null);
                          setReplyInput("");
                        }}
                        className="hover:text-foreground"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>

                    <textarea
                      ref={replyTextareaRef}
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                      placeholder="Write your reply..."
                      rows={2}
                      className="w-full resize-none bg-background rounded-lg border border-border/80 p-2.5 text-xs sm:text-sm text-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    />

                    <div className="flex items-center justify-end gap-2 mt-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setReplyingToId(null);
                          setReplyInput("");
                        }}
                        className="h-7 px-2.5 text-xs"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        disabled={!replyInput.trim() || submittingReply}
                        onClick={() => handlePostReply(comment.id)}
                        className="h-7 px-3 text-xs gap-1.5 rounded-md"
                      >
                        {submittingReply ? (
                          <>
                            <Loader2 className="size-3 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="size-3" />
                            Send Reply
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Nested Replies List */}
                {replies.length > 0 && (
                  <div className="mt-4 ml-4 sm:ml-8 pl-4 border-l-2 border-border/60 space-y-3.5">
                    {replies.map((reply) => {
                      const replyHasLiked = Boolean(user && reply.likes?.includes(user.uid));
                      const replyLikeCount = reply.likes?.length || 0;
                      const isReplyAuthor = user?.uid === reply.author.uid;
                      const canDeleteReply = isReplyAuthor || isAdmin;
                      const isReplyAdmin = (reply.author.email || "").toLowerCase() === ADMIN_EMAIL;

                      return (
                        <div
                          key={reply.id}
                          className="rounded-xl border border-border/60 bg-muted/20 p-3 sm:p-3.5 transition-colors hover:border-border"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="size-6 sm:size-7 ring-1 ring-border shrink-0">
                                {reply.author.photoURL && (
                                  <AvatarImage
                                    src={reply.author.photoURL}
                                    alt={reply.author.name}
                                  />
                                )}
                                <AvatarFallback className="text-[10px] font-semibold bg-muted text-muted-foreground">
                                  {getInitials(reply.author.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-xs sm:text-sm font-semibold text-foreground leading-tight">
                                    {reply.author.name}
                                  </span>
                                  {isReplyAdmin ? (
                                    <span className="inline-flex items-center gap-0.5 px-1 py-0.1 rounded text-[9px] font-semibold bg-amber-500/15 text-amber-500 border border-amber-500/30">
                                      <ShieldCheck className="size-2" />
                                      Admin
                                    </span>
                                  ) : isPostAuthor(reply.author) ? (
                                    <span className="inline-flex items-center gap-0.5 px-1 py-0.1 rounded text-[9px] font-semibold bg-primary/10 text-primary border border-primary/20">
                                      <ShieldCheck className="size-2" />
                                      Author
                                    </span>
                                  ) : null}
                                </div>
                                <span className="text-[10px] text-muted-foreground">
                                  {formatRelativeTime(reply.createdAt)}
                                </span>
                              </div>
                            </div>

                            {/* Delete reply if user is author OR admin */}
                            {canDeleteReply && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteComment(reply.id, !isReplyAuthor)}
                                disabled={actionInProgress === `delete-${reply.id}`}
                                className={`size-6 p-0 rounded-md ${
                                  isAdmin && !isReplyAuthor
                                    ? "text-amber-500/90 hover:text-amber-500 hover:bg-amber-500/10"
                                    : "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                }`}
                                title={isAdmin && !isReplyAuthor ? "Delete reply (Admin privilege)" : "Delete reply"}
                              >
                                {actionInProgress === `delete-${reply.id}` ? (
                                  <Loader2 className="size-3 animate-spin" />
                                ) : (
                                  <Trash2 className="size-3" />
                                )}
                              </Button>
                            )}
                          </div>

                          {/* Reply Body */}
                          <div className="mt-2 text-xs sm:text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap pl-8">
                            {reply.content}
                          </div>

                          {/* Reply Actions */}
                          <div className="mt-2 pl-8 flex items-center gap-2 text-[11px] text-muted-foreground">
                            <button
                              onClick={() => handleToggleLike(reply)}
                              disabled={actionInProgress === `like-${reply.id}`}
                              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors ${
                                replyHasLiked
                                  ? "text-red-500 font-semibold bg-red-500/10"
                                  : "hover:text-foreground hover:bg-muted/80"
                              }`}
                            >
                              <Heart className={`size-3 ${replyHasLiked ? "fill-current" : ""}`} />
                              <span>{replyLikeCount > 0 ? replyLikeCount : "Like"}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Login & Registration Modal */}
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </section>
  );
}
