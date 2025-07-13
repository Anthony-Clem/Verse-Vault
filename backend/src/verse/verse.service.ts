import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SearchVerseDto } from './dto/search-verse.dto';
import axios from 'axios';
import {
  BibleApiRandomResponse,
  BibleApiResponse,
} from './types/bible-api-response.type';
import { Verse } from './types/verse.type';
import { PrismaService } from 'src/prisma.service';
import { FavoriteVerseDto } from './dto/favorite-verse.dto';

@Injectable()
export class VerseService {
  constructor(private readonly prisma: PrismaService) {}

  async searchVerse({ searchText }: SearchVerseDto) {
    try {
      const formatted = searchText.trim().replace(/\s+/g, '+').toLowerCase();
      console.log(formatted);

      const url = `https://bible-api.com/${formatted}?translation=kjv`;

      const res = await axios.get<BibleApiResponse>(url);

      const isFavorited = await this.prisma.verse.findFirst({
        where: {
          bookId: res.data.verses[0].book_id,
          bookName: res.data.verses[0].book_name,
          chapter: res.data.verses[0].chapter,
          verse: res.data.verses[0].verse,
        },
      });

      return this.normalizeVerse(res.data.verses[0], !!isFavorited);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Failed to search verse');
    }
  }

  async randomVerse() {
    try {
      const url = 'https://bible-api.com/data/web/random?translation=kjv';

      const res = await axios.get<BibleApiRandomResponse>(url);

      const isFavorited = await this.prisma.verse.findFirst({
        where: {
          bookId: res.data.random_verse.book_id,
          bookName: res.data.random_verse.book.toLowerCase(),
          chapter: res.data.random_verse.chapter,
          verse: res.data.random_verse.verse,
        },
      });

      return this.normalizeVerse(res.data.random_verse, !!isFavorited);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Failed to search verse');
    }
  }

  async favoriteVerse(dto: FavoriteVerseDto, userId: string) {
    const {
      book,
      bookId,
      book_id,
      bookName,
      book_name,
      chapter,
      verse,
      text,
      isFavorited,
    } = dto;

    const existing = await this.prisma.verse.findFirst({
      where: {
        userId,
        bookId,
        chapter,
        verse,
      },
    });

    if (isFavorited && existing) {
      await this.prisma.verse.delete({
        where: {
          id: existing.id,
        },
      });
      return { status: 'unfavorited' };
    }

    if (!book_id || !bookId) {
      throw new BadRequestException('No book id provided');
    }

    if (!book || !book_name || !bookName) {
      throw new BadRequestException('No book name provided');
    }

    if (!isFavorited && !existing) {
      await this.prisma.verse.create({
        data: {
          bookId,
          bookName: book || book_name || bookName,
          chapter,
          verse,
          text,
          userId,
        },
      });
      return { status: 'favorited' };
    }

    return { status: 'unchanged' };
  }

  async getVerses(userId: string) {
    const verses = await this.prisma.verse.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return verses.map((verse) => ({
      ...verse,
      isFavorited: true,
    }));
  }

  private normalizeVerse(verse: Verse, isFavorited: boolean): Verse {
    return {
      ...verse,
      book_name: verse.book_name || verse.book,
      isFavorited: isFavorited,
    };
  }
}
