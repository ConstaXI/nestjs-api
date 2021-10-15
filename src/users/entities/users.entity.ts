import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';
@Entity()
@ObjectType()
export class User {
  constructor() {
    this.id = v4();
  }

  @PrimaryColumn()
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
