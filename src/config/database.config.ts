import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'metrocery',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],

  // Development: Auto sync schema và show queries
  synchronize: process.env.NODE_ENV !== 'production',

  // Logging configuration
  logging:
    process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'schema']
      : ['error'],

  // Connection pool settings
  extra: {
    connectionLimit: 10,
  },

  // Timezone
  timezone: '+07:00', // Vietnam timezone
};
