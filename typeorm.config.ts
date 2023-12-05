import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Restaurant } from 'src/restaurants/entities/restaurants.entity';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB__HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: true,
  synchronize: process.env.NODE_ENV === 'dev' ? true : false,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [Restaurant],
};

export default typeOrmConfig;
