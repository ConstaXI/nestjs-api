import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private gamesRepository: Repository<Game>,
  ) {}

  findAll(): Promise<Game[]> {
    return this.gamesRepository.find();
  }

  findOne(id: string): Promise<Game> {
    return this.gamesRepository.findOneOrFail(id);
  }

  async createGame(createGameInput: CreateGameInput): Promise<Game> {
    const game = this.gamesRepository.create(createGameInput);

    await this.gamesRepository.save(game);

    return game;
  }

  async updategame(
    id: string,
    updateGameInput: UpdateGameInput,
  ): Promise<Game> {
    return this.gamesRepository.save({ id: id, ...updateGameInput });
  }

  async deleteGame(id: string): Promise<Game> {
    const game = await this.gamesRepository.findOneOrFail(id);

    return game.remove();
  }
}
