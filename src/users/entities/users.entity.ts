import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
@ObjectType()
export class User {
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

  @OneToOne(() => Role, (role) => role.user, {
    cascade: true,
  })
  @JoinColumn()
  @Field(() => Role)
  role: Role;
}
