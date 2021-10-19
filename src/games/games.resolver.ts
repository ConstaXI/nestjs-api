import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateGameInput } from './dto/create-game.input';
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
}
