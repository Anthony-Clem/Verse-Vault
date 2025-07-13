"use client";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { useVerse, Verse } from "@/contexts/verse-context";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MyVersesPage = () => {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { verses, loading: versesLoading, getVerses, setVerses } = useVerse();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
    }

    if (user) {
      getVerses();
    }
  }, [authLoading, user, router, getVerses]);

  if (authLoading || versesLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  const onFavorite = async (target: Verse) => {
    try {
      await api.post("/verse/favorite", {
        ...target,
        isFavorited: target.isFavorited,
      });

      setVerses((prev) =>
        prev.filter(
          (v) =>
            !(
              v.book_id === target.book_id &&
              v.chapter === target.chapter &&
              v.verse === target.verse
            )
        )
      );
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    }
  };

  console.log(verses);

  return (
    <div className="grid max-sm:mx-auto sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
      {verses.length === 0 && (
        <p className="text-center text-gray-500">No favorite verses found.</p>
      )}

      {verses.map((verse) => (
        <Card
          className="bg-white shadow-md border border-gray-200 max-w-[400px] w-full"
          key={`${verse.book_id}-${verse.chapter}-${verse.verse}`}
        >
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">
              {verse.bookName} {verse.chapter}:{verse.verse}
            </CardTitle>
            <CardAction>
              <Heart
                onClick={() => onFavorite(verse)}
                className={cn(
                  "size-4 cursor-pointer transition-colors",
                  verse.isFavorited ? "text-red-500" : "text-gray-500 hover:text-red-500"
                )}
              />
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {verse.text}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MyVersesPage;
