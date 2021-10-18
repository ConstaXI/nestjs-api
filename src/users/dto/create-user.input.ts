import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsEmail } from 'class-validator';
import { UserRole } from '../entities/user.interface';

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

  @Field()
  role: UserRole;
}
