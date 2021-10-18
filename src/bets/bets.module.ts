import { Module } from '@nestjs/common';
import { BetsResolver } from './bets.resolver';
import { BetsService } from './bets.service';

@Module({
  providers: [BetsResolver, BetsService],
})
export class BetsModule {}
