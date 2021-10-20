import { arrayMaxSize, arrayMinSize, ValidationError } from 'class-validator';
import { Game } from 'src/games/entities/game.entity';

export const verifyNumbers = (numbers: number[], game: Game) => {
  if (
    !arrayMinSize(numbers, game.max_numbers) ||
    !arrayMaxSize(numbers, game.max_numbers)
  )
    throw new ValidationError();

  if (numbers.length !== new Set(numbers).size) {
    throw new ValidationError();
  }

  numbers.forEach((number) => {
    if (number > game.range) {
      console.log('error 2');
      throw new ValidationError();
    }
  });
};
