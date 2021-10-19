import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/games/entities/game.entity';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateBetInput } from './dto/create-bet.input';
import { Bet } from './entities/bet.entity';

@Injectable()
export class BetsService {
  constructor(@InjectRepository(Bet) private betsRepository: Repository<Bet>) {}

  async createBet(
    user: User,
    game: Game,
    { numbers }: CreateBetInput,
  ): Promise<Bet> {
    const bet = this.betsRepository.create({
      numbers: numbers,
      gameId: game.id,
      userId: user.id,
    });

    return bet.save();
  }
}
