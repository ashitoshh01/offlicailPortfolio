"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/blog/google-icon";
import { useAuth } from "@/lib/use-auth";
import { Loader2, Mail, Lock, User as UserIcon, AlertCircle } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AuthModal({ open, onOpenChange, onSuccess }: AuthModalProps) {
  const {
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    loading: authLoading,
    error: authError,
    clearError,
  } = useAuth();

  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setLocalError(null);
    clearError();
  };

  const handleModeSwitch = (newMode: "signIn" | "signUp") => {
    setMode(newMode);
    setLocalError(null);
    clearError();
  };

  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    setLocalError(null);
    const user = await signInWithGoogle();
    setSubmitting(false);
    if (user) {
      resetForm();
      onOpenChange(false);
      onSuccess?.();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email.trim() || !password.trim()) {
      setLocalError("Please enter your email and password.");
      return;
    }

    if (mode === "signUp" && !name.trim()) {
      setLocalError("Please enter your name.");
      return;
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    let user = null;
    if (mode === "signIn") {
      user = await signInWithEmail(email, password);
    } else {
      user = await signUpWithEmail(email, password, name);
    }
    setSubmitting(false);

    if (user) {
      resetForm();
      onOpenChange(false);
      onSuccess?.();
    }
  };

  const activeError = localError || authError;

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) resetForm();
        onOpenChange(val);
      }}
    >
      <DialogContent className="sm:max-w-[420px] p-6 rounded-2xl border border-border/80 bg-background/95 backdrop-blur-md shadow-2xl">
        <DialogHeader className="space-y-1.5 text-center sm:text-center pb-2">
          <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
            {mode === "signIn" ? "Welcome Back" : "Join the Discussion"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {mode === "signIn"
              ? "Sign in to join the conversation and reply to comments."
              : "Create an account to ask questions and share insights."}
          </DialogDescription>
        </DialogHeader>

        {/* Error notification */}
        {activeError && (
          <div className="p-3 rounded-xl border border-destructive/25 bg-destructive/10 text-destructive text-xs flex items-center gap-2 animate-in fade-in-50">
            <AlertCircle className="size-4 shrink-0" />
            <p className="flex-1">{activeError}</p>
          </div>
        )}

        {/* Google One-Click Button */}
        <div className="pt-1">
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={submitting || authLoading}
            className="w-full h-10 gap-2.5 rounded-xl border-border/80 hover:bg-muted/80 text-xs sm:text-sm font-medium shadow-xs transition-all"
          >
            {submitting && !email ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <GoogleIcon className="size-4 shrink-0" />
            )}
            Continue with Google
          </Button>
        </div>

        {/* Divider */}
        <div className="relative my-2 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/60" />
          </div>
          <span className="relative bg-background px-3 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
            Or with email
          </span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "signUp" && (
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-muted-foreground">Your Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full h-9 pl-9 pr-3 rounded-lg border border-border/80 bg-muted/20 text-xs sm:text-sm text-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-muted-foreground">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-border/80 bg-muted/20 text-xs sm:text-sm text-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-muted-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-border/80 bg-muted/20 text-xs sm:text-sm text-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50"
              />
            </div>
            {mode === "signUp" && (
              <p className="text-[10px] text-muted-foreground/80 pl-1">Must be at least 6 characters</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={submitting || authLoading}
            className="w-full h-9 rounded-lg font-medium text-xs sm:text-sm shadow-xs transition-all mt-2"
          >
            {submitting && email ? (
              <>
                <Loader2 className="size-3.5 animate-spin mr-2" />
                {mode === "signIn" ? "Signing In..." : "Creating Account..."}
              </>
            ) : mode === "signIn" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        {/* Footer Toggle */}
        <div className="text-center pt-2 border-t border-border/40">
          {mode === "signIn" ? (
            <p className="text-xs text-muted-foreground">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => handleModeSwitch("signUp")}
                className="text-primary font-semibold hover:underline cursor-pointer"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => handleModeSwitch("signIn")}
                className="text-primary font-semibold hover:underline cursor-pointer"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
