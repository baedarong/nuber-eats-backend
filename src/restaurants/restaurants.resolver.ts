import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurants.entity';
import { createRestaurantDTO } from './dtos/restaurants.dto';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  @Query((returns) => [Restaurant])
  restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
    return [];
  }

  @Mutation((returns) => Boolean)
  createRestaurant(
    @Args() createRestaurantInput: createRestaurantDTO,
  ): boolean {
    return true;
  }
}
