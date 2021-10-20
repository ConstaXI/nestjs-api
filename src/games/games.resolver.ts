import { Param, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HasRoles } from 'src/auth/decorators/has-roles';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Game } from './entities/game.entity';
import { GamesService } from './games.service';
import { UserRole } from '../users/entities/user.interface';

@Resolver()
export class GamesResolver {
  constructor(private gamesService: GamesService) {}

  @Query(() => [Game])
  async getGames(): Promise<Game[]> {
    return await this.gamesService.findAll();
  }

  @HasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Game)
  async createGame(
    @Args('createGameInput') createGameInput: CreateGameInput,
  ): Promise<Game> {
    return await this.gamesService.createGame(createGameInput);
  }

  @HasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Game)
  async updateGame(
    @Param('id') id: string,
    @Args('updateGameInput') updateGameInput: UpdateGameInput,
  ): Promise<Game> {
    return this.gamesService.updategame(id, updateGameInput);
  }

  @HasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Game)
  async deleteGame(@Args('id') id: string): Promise<Game> {
    return await this.gamesService.deleteGame(id);
  }
}
