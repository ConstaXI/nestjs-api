import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { CreateRoleInput } from '../roles/dto/create-role.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  getUser(@Args('email', { type: () => String }) email: string): Promise<User> {
    return this.usersService.findOne(email);
  }

  @Query(() => [User])
  getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @Args('createRoleInput') createRoleInput: CreateRoleInput,
  ): Promise<User> {
    return this.usersService.createUser(createUserInput, createRoleInput);
  }

  @Mutation(() => User)
  deleteUser(@Args('id', { type: () => String }) id: string): void {
    this.usersService.deleteUser(id);
  }
}
