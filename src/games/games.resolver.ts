import { Param } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateResult } from 'typeorm';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Game } from './entities/game.entity';
import { GamesService } from './games.service';

@Resolver()
export class GamesResolver {
  constructor(private gamesService: GamesService) {}

  @Query(() => [Game])
  async getGames(): Promise<Game[]> {
    return await this.gamesService.findAll();
  }

  @Mutation(() => Game)
  async createGame(
    @Args('createGameInput') createGameInput: CreateGameInput,
  ): Promise<Game> {
    return await this.gamesService.createGame(createGameInput);
  }

  @Mutation(() => Game)
  async updateGame(
    @Param('id') id: string,
    @Args('updateGameInput') updateGameInput: UpdateGameInput,
  ): Promise<Game> {
    console.log(id);
    return this.gamesService.updategame(id, updateGameInput);
  }

  @Mutation(() => Game)
  async deleteGame(@Args('id') id: string): Promise<Game> {
    return await this.gamesService.deleteGame(id);
  }
}
