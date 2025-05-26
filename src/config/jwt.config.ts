import { JwtModuleOptions } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

export const jwtConfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET || 'metrocery_secret_key',
  signOptions: {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
};
