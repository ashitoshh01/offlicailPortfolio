"use client";

import { useEffect, useState, useCallback } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  AuthError,
} from "firebase/auth";
import { auth, googleProvider, githubProvider } from "./firebase";

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<User | null>;
  signInWithGithub: () => Promise<User | null>;
  signInWithEmail: (email: string, password: string) => Promise<User | null>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<User | null>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      (err) => {
        console.error("Auth state error:", err);
        setError("Unable to authenticate session. Please try again.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const signInWithGoogle = useCallback(async (): Promise<User | null> => {
    setError(null);
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      return result.user;
    } catch (err: unknown) {
      const authErr = err as AuthError;
      console.error("Error signing in with Google:", authErr);

      if (authErr.code === "auth/popup-closed-by-user") {
        setError(null);
      } else if (authErr.code === "auth/popup-blocked") {
        setError("Pop-up was blocked by your browser. Please allow pop-ups for this site to sign in.");
      } else if (authErr.code === "auth/network-request-failed") {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("Unable to complete sign-in right now. Please try again.");
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const signInWithGithub = useCallback(async (): Promise<User | null> => {
    setError(null);
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, githubProvider);
      setUser(result.user);
      return result.user;
    } catch (err: unknown) {
      const authErr = err as AuthError;
      console.error("Error signing in with GitHub:", authErr);
      if (authErr.code === "auth/popup-closed-by-user") {
        setError(null);
      } else if (authErr.code === "auth/popup-blocked") {
        setError("Pop-up was blocked by your browser. Please allow pop-ups for this site to sign in.");
      } else {
        setError("Unable to complete sign-in right now. Please try again.");
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const signInWithEmail = useCallback(
    async (email: string, password: string): Promise<User | null> => {
      setError(null);
      setLoading(true);
      try {
        const result = await signInWithEmailAndPassword(auth, email.trim(), password);
        setUser(result.user);
        return result.user;
      } catch (err: unknown) {
        const authErr = err as AuthError;
        console.error("Error signing in with email:", authErr);
        if (
          authErr.code === "auth/invalid-credential" ||
          authErr.code === "auth/user-not-found" ||
          authErr.code === "auth/wrong-password"
        ) {
          setError("Incorrect email or password. Please try again.");
        } else if (authErr.code === "auth/invalid-email") {
          setError("Please enter a valid email address.");
        } else if (authErr.code === "auth/too-many-requests") {
          setError("Too many attempts. Please wait a moment and try again.");
        } else {
          setError("Unable to sign in. Please check your credentials and try again.");
        }
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const signUpWithEmail = useCallback(
    async (email: string, password: string, displayName: string): Promise<User | null> => {
      setError(null);
      setLoading(true);
      try {
        const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
        if (displayName.trim()) {
          await updateProfile(result.user, { displayName: displayName.trim() });
        }
        setUser(result.user);
        return result.user;
      } catch (err: unknown) {
        const authErr = err as AuthError;
        console.error("Error creating account:", authErr);
        if (authErr.code === "auth/email-already-in-use") {
          setError("An account with this email already exists. Try signing in instead.");
        } else if (authErr.code === "auth/weak-password") {
          setError("Password should be at least 6 characters.");
        } else if (authErr.code === "auth/invalid-email") {
          setError("Please enter a valid email address.");
        } else {
          setError("Unable to create account. Please try again.");
        }
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const signOut = useCallback(async (): Promise<void> => {
    setError(null);
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (err: unknown) {
      const authErr = err as AuthError;
      console.error("Error signing out:", authErr);
      setError("Unable to sign out. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    signInWithGoogle,
    signInWithGithub,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    clearError,
  };
}
