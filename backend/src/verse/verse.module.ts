import { Module } from '@nestjs/common';
import { VerseService } from './verse.service';
import { VerseController } from './verse.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VerseController],
  providers: [VerseService, PrismaService],
})
export class VerseModule {}
