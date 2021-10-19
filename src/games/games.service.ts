import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameInput } from './dto/create-game.input';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private gamesRepository: Repository<Game>,
  ) {}

  findAll(): Promise<Game[]> {
    return this.gamesRepository.find();
  }

  async createGame(createGameInput: CreateGameInput): Promise<Game> {
    const game = this.gamesRepository.create(createGameInput);

    await this.gamesRepository.save(game);

    return game;
  }
}
