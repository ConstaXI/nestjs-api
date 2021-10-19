import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bet } from '../../bets/entities/bet.entity';

@Entity()
@ObjectType()
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  type: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field(() => Int)
  range: number;

  @Column({ type: 'float' })
  @Field(() => Float)
  price: number;

  @Column()
  @Field(() => Int)
  max_numbers: number;

  @Column()
  @Field()
  color: string;

  @OneToMany(() => Bet, (bet) => bet.game, { cascade: true })
  @JoinColumn()
  bets: Bet[];
}
