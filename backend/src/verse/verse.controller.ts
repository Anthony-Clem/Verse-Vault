import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { FavoriteVerseDto } from './dto/favorite-verse.dto';
import { SearchVerseDto } from './dto/search-verse.dto';
import { VerseService } from './verse.service';

@Controller('verse')
export class VerseController {
  constructor(private readonly verseService: VerseService) {}

  @Post('search')
  async searchVerse(@Body() dto: SearchVerseDto) {
    return this.verseService.searchVerse(dto);
  }

  @UseGuards(JwtGuard)
  @Get()
  async getVerses(@GetUser() user: User) {
    return this.verseService.getVerses(user.id);
  }

  @Get('random')
  async randomVerse() {
    return this.verseService.randomVerse();
  }

  @UseGuards(JwtGuard)
  @Post('favorite')
  async favoriteVerse(@Body() dto: FavoriteVerseDto, @GetUser() user: User) {
    return this.verseService.favoriteVerse(dto, user.id);
  }
}
