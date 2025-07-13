"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";

export type Verse = {
  book_id: string;
  book_name: string;
  bookName: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  isFavorited?: boolean;
};

interface VerseContextType {
  verse: Verse | null;
  verses: Verse[];
  loading: boolean;
  error: string | null;
  searchVerse: (searchText: string) => Promise<void>;
  randomVerse: () => Promise<void>;
  getVerses: () => Promise<void>;
  setVerse: React.Dispatch<React.SetStateAction<Verse | null>>;
  setVerses: React.Dispatch<React.SetStateAction<Verse[]>>;
}

const VerseContext = createContext<VerseContextType | undefined>(undefined);

export const VerseProvider = ({ children }: { children: React.ReactNode }) => {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchVerse = async (searchText: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.post("/verse/search", { searchText });
      setVerse(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch verse.");
      setVerse(null);
    } finally {
      setLoading(false);
    }
  };

  const randomVerse = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/verse/random");
      setVerse(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch verse.");
      setVerse(null);
    } finally {
      setLoading(false);
    }
  };

  const getVerses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get<Verse[]>("/verse");
      setVerses(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch verses.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    randomVerse();
  }, []);

  return (
    <VerseContext.Provider
      value={{
        verse,
        verses,
        loading,
        error,
        searchVerse,
        randomVerse,
        getVerses,
        setVerse,
        setVerses,
      }}
    >
      {children}
    </VerseContext.Provider>
  );
};

export const useVerse = () => {
  const context = useContext(VerseContext);
  if (!context) {
    throw new Error("useVerse must be used within a VerseProvider");
  }
  return context;
};
