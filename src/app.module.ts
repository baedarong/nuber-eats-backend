import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

import typeOrmConfig from 'typeorm.config';
import { validationConfig } from 'validation.config';

import { RestaurantsModule } from './restaurants/restaurants.module';
import { FoodsModule } from './foods/foods.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      envFilePath: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev',
      validationSchema: validationConfig,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    UsersModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
