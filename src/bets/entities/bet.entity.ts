import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Game } from 'src/games/entities/game.entity';
import { User } from 'src/users/entities/users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Bet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Field(() => [Int])
  @Column({ type: 'varchar' })
  numbers: number[];

  @Column()
  userId: string;

  @Column()
  gameId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.bets)
  user: User;

  @Field(() => Game)
  @ManyToOne(() => Game, (game) => game.bets)
  game: Game;
}
