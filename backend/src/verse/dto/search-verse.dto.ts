import { IsNotEmpty, IsString } from 'class-validator';

export class SearchVerseDto {
  @IsString()
  @IsNotEmpty()
  searchText: string;
}
