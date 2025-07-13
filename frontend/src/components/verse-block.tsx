"use client";

import { Heart, Loader2 } from "lucide-react";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useVerse } from "@/contexts/verse-context";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";

const VerseBlock = () => {
  const { loading, verse, error, setVerse } = useVerse();
  const { setShowModal, user } = useAuth();

  if (loading) return <Loader2 className="mx-auto size-6 animate-spin" />;

  if (error) {
    console.log("error", error);
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!verse) return null;

  const onFavorite = async () => {
    if (!user) {
      return setShowModal(true);
    }

    if (!verse) return;

    try {
      console.log(verse);

      await api.post("/verse/favorite", {
        ...verse,
        isFavorited: verse.isFavorited,
      });

      setVerse({ ...verse, isFavorited: !verse.isFavorited });
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    }
  };

  return (
    <Card className="bg-white shadow-md border border-gray-200 max-w-[400px] mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-800">
          {verse.book_name} {verse.chapter}:{verse.verse}
        </CardTitle>
        <CardAction>
          <Heart
            onClick={onFavorite}
            className={cn(
              "size-4 cursor-pointer transition-colors",
              verse.isFavorited ? "text-red-500" : "text-gray-500 hover:text-red-500"
            )}
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {`${verse.text}`}
        </p>
      </CardContent>
    </Card>
  );
};

export default VerseBlock;
