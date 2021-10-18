import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './dto/loginInput';
import { AuthType } from './dto/auth.type';
import { User } from '../users/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: LoginInput): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Senha incorreta');
    }

    return user;
  }

  login(user: User): AuthType {
    const payload = { email: user.email, sub: user.id };

    return {
      user: user,
      token: this.jwtService.sign(payload),
    };
  }
}
