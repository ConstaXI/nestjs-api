import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsAlpha, Length } from 'class-validator';

@InputType()
export class CreateGameInput {
  @IsAlpha()
  @Field()
  type: string;

  @Field()
  description: string;

  @Field(() => Int)
  range: number;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  max_numbers: number;

  @Length(6)
  @Field()
  color: string;
}
