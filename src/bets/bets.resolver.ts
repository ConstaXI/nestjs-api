import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BetsService } from './bets.service';
import { CreateBetInput } from './dto/create-bet.input';
import { Bet } from './entities/bet.entity';
import { CurrentUser } from '../auth/decorators/get-current-user';
import { User } from 'src/users/entities/users.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { GamesService } from 'src/games/games.service';
import { verifyNumbers } from './dto/verify-numbers';

@Resolver()
export class BetsResolver {
  constructor(
    private betsService: BetsService,
    private gamesService: GamesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Bet)
  async createBet(
    @CurrentUser() user: User,
    @Args('createBetInput') createBetInput: CreateBetInput,
  ): Promise<Bet> {
    const { gameId } = createBetInput;

    const game = await this.gamesService.findOne(gameId);

    verifyNumbers(createBetInput.numbers, game);

    return await this.betsService.createBet(user, game, createBetInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Bet])
  async getBets(@CurrentUser() user: User): Promise<Bet[]> {
    return await this.betsService.findByUser(user);
  }
}
