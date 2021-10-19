import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGameInput {
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

  @Field()
  color: string;
}
