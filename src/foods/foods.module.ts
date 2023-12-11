import { Module } from '@nestjs/common';
import { FoodsResolver } from './foods.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './entities/foods.entities';
import { FoodsService } from './foods.service';

@Module({
  imports: [TypeOrmModule.forFeature([Food])],
  providers: [FoodsResolver, FoodsService],
})
export class FoodsModule {}
