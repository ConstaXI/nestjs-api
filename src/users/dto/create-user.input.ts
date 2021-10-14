import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsAlpha()
  @Field()
  name: string;

  @IsAlpha()
  @Field()
  surname: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
