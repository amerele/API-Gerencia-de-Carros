import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/domain/modules/users.module';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from './authenticated.guard';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true }), JwtModule.register({
    secret: process.env.JWT_KEY,
    signOptions: { expiresIn: '1h' },
  })],
  providers: [AuthService, SessionSerializer, {
    provide: APP_GUARD,
    useClass: JwtStrategy,
  },],
  exports: [AuthService]
})
export class AuthModule {}
