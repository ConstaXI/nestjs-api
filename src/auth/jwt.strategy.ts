import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JtwStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'coquinha gelada, hmm',
    });
  }

  async validate(payload: { sub: User['id']; email: string }) {
    return this.usersService.findOne(payload.sub);
  }
}
