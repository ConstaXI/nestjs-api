import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateBetInput {
  @Field(() => [Int])
  numbers: number[];

  @Field()
  gameId: string;
}
