import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsOptional } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsOptional()
  @IsAlpha()
  @Field({ nullable: true })
  name!: string;

  @IsOptional()
  @IsAlpha()
  @Field({ nullable: true })
  surname!: string;

  @IsOptional()
  @IsEmail()
  @Field({ nullable: true })
  email!: string;
}
