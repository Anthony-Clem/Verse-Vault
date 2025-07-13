import { Verse } from './verse.type';

export interface BibleApiResponse {
  reference: string;
  verses: Verse[];
  text: string;
  translation_id: string;
  translation_name: string;
  translation_note: string;
  error?: string;
}

export interface BibleApiRandomResponse {
  reference: string;
  random_verse: Verse;
  text: string;
  translation_id: string;
  translation_name: string;
  translation_note: string;
  error?: string;
}
