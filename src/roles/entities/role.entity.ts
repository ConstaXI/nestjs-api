import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';
import { User } from '../../users/entities/users.entity';
@Entity()
@ObjectType()
export class Role {
  constructor() {
    this.id = v4();
  }

  @PrimaryColumn()
  @Field()
  id: string;

  @Column()
  @Field()
  type: string;

  @OneToOne(() => User, (user) => user.role)
  @Field(() => User)
  user: User;
}
