import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'metrocery_secret_key',
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.usersService.findOne(payload.sub as string);
      if (!user.isActive) {
        throw new UnauthorizedException('User is inactive');
      }
      return {
        id: payload.sub as string,
        email: payload.email as string,
        role: payload.role as string,
      };
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
