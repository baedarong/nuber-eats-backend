import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { Food } from './entities/foods.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { createFoodDto, updateFoodDto } from './dtos/foods.dtos';

@Injectable()
export class FoodsService {
  // typeorm Injection 죽입
  constructor(
    @InjectRepository(Food)
    private readonly foodBase: Repository<Food>,
  ) {}

  // typeOrm 구문으로 작성
  getAllFoods(): Promise<Food[]> {
    return this.foodBase.find();
  }

  addFood(createFoodArg: createFoodDto): Promise<Food> {
    const newFood = this.foodBase.create(createFoodArg);
    return this.foodBase.save(newFood);
  }

  updateFood({ id, data }: updateFoodDto): Promise<UpdateResult> {
    return this.foodBase.update(id, { ...data });
  }
}
