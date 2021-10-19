import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['type'])
@ObjectType()
export class Game {
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
}
