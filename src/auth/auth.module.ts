import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/domain/modules/users.module';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true }), JwtModule.register({
    secret: 'Happ',
    signOptions: { expiresIn: '1h' },
  })],
  providers: [AuthService, SessionSerializer],
  exports: [AuthService]
})
export class AuthModule {}
