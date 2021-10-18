import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JtwStrategy } from './jwt.strategy';
import { SessionSerializer } from './session.serializer';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: 'coquinha gelada, hmm',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, SessionSerializer, JtwStrategy, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
