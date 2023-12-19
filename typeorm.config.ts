import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from 'src/users/entities/user.entity';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB__HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: process.env.NODE_ENV !== 'prod',
  synchronize: process.env.NODE_ENV !== 'prod',
  namingStrategy: new SnakeNamingStrategy(),
  entities: [User],
};

export default typeOrmConfig;
