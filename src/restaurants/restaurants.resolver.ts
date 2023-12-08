import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurants.entity';
import { createRestaurantDTO } from './dtos/restaurants.dto';
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
    @Args('input') createRestaurantDTO: createRestaurantDTO,
  ): Promise<boolean> {
    try {
      await this.restaurantService.createRestaurant(createRestaurantDTO);
      return true;
    } catch (error) {
      return false;
    }
  }
}
