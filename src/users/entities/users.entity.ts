import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Bet } from 'src/bets/entities/bet.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserRole } from './user.interface';

registerEnumType(UserRole, {
  name: 'UserRole',
});

@Entity()
@Unique(['email'])
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  surname: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.PLAYER })
  @Field(() => UserRole)
  role: UserRole;

  @OneToMany(() => Bet, (bet) => bet.user, { cascade: true })
  @JoinColumn()
  bets: Bet[];
}
