import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurants.entity';
import {
  CreateRestaurantDTO,
  UpdateRestaurantDTO,
} from './dtos/restaurants.dto';
import { RestaurantsService } from './restaurants.service';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantsService) {}

  @Query((returns) => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }

  @Mutation((returns) => Boolean)
  async createRestaurant(
    @Args('args') createRestaurantArgs: CreateRestaurantDTO,
  ): Promise<boolean> {
    try {
      await this.restaurantService.createRestaurant(createRestaurantArgs);
      return true;
    } catch (error) {
      return false;
    }
  }

  @Mutation((returns) => Boolean)
  async updateRestaurant(
    @Args('args') updateRestaurantArgs: UpdateRestaurantDTO,
  ): Promise<boolean> {
    try {
      await this.restaurantService.updateRestaurant(updateRestaurantArgs);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
