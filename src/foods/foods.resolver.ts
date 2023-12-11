import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Food } from './entities/foods.entities';
import { FoodsService } from './foods.service';
import { createFoodDto, updateFoodDto } from './dtos/foods.dtos';

// entity를 매개로 정해줘야한다.
@Resolver((of) => Food)
export class FoodsResolver {
  // sevice 객체 가져오기
  constructor(private readonly foodService: FoodsService) {}

  //graphQL로 작성. Query 및 Mutation
  @Query((returns) => [Food])
  getAllFoods(): Promise<Food[]> {
    return this.foodService.getAllFoods();
  }

  @Mutation((returns) => Boolean)
  async addFood(@Args('args') createFoodArgs: createFoodDto): Promise<boolean> {
    try {
      await this.foodService.addFood(createFoodArgs);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @Mutation((returns) => Boolean)
  async updateFood(@Args('args') updateFoodArgs: updateFoodDto) {
    try {
      console.log(updateFoodArgs);
      await this.foodService.updateFood(updateFoodArgs);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
