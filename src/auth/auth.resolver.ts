import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginInput } from './dto/loginInput';
import { AuthService } from './auth.service';
import { AuthType } from './dto/auth.type';
import { CurrentUser, JwtAuthGuard } from './guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/users/entities/users.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthType)
  async login(@Args('loginInput') loginInput: LoginInput): Promise<AuthType> {
    const user = await this.authService.validateUser(loginInput);

    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  async protected(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}