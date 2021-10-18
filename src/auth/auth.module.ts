import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.stategy';
import { SessionSerializer } from './session.serializer';
import { JwtModule } from '@nestjs/jwt';
import { JtwStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: 'coquinha gelada, hmm',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, SessionSerializer, JtwStrategy],
  exports: [AuthService],
})
export class AuthModule {}
