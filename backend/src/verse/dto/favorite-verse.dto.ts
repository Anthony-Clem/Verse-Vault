import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class FavoriteVerseDto {
  bookId: string;

  book_id: string;

  bookName: string;

  book_name: string;

  book: string;

  @IsNumber()
  @Min(1)
  chapter: number;

  @IsNumber()
  @Min(1)
  verse: number;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsBoolean()
  @IsOptional()
  isFavorited?: boolean;
}
