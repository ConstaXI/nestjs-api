import { ObjectType, Field } from '@nestjs/graphql';
import { Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/users.entity';

@ObjectType()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  type: string;

  @OneToOne(() => User, (user) => user.role)
  @Field(() => User)
  user: User;
}
