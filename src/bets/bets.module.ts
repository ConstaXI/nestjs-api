import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetsResolver } from './bets.resolver';
import { BetsService } from './bets.service';
import { Bet } from './entities/bet.entity';
import { GamesModule } from '../games/games.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bet]), GamesModule],
  providers: [BetsResolver, BetsService],
})
export class BetsModule {}
