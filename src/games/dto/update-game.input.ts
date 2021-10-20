import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsAlpha, IsOptional, IsUUID, Length } from 'class-validator';

@InputType()
export class UpdateGameInput {
  @IsUUID()
  @Field()
  id: string;

  @IsAlpha()
  @IsOptional()
  @Field({ nullable: true })
  type: string;

  @IsOptional()
  @Field({ nullable: true })
  description: string;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  range: number;

  @IsOptional()
  @Field(() => Float, { nullable: true })
  price: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  max_numbers: number;

  @IsOptional()
  @Length(6)
  @Field({ nullable: true })
  color: string;
}
