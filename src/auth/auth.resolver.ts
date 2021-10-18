import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from './dto/loginInput';
import { AuthService } from './auth.service';
import { AuthType } from './dto/auth.type';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthType)
  async login(@Args('loginInput') loginInput: LoginInput): Promise<AuthType> {
    const user = await this.authService.validateUser(loginInput);

    return this.authService.login(user);
  }
}
