import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsAlpha()
  @Field()
  name: string;

  @IsAlpha()
  @Field()
  surname: string;

  @IsEmail()
  @Field()
  email: string;

  @Field()
  password: string;
}
