import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurants.entity';
import { Repository } from 'typeorm';
import { createRestaurantDTO } from './dtos/restaurants.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurant: Repository<Restaurant>,
  ) {}

  getAll(): Promise<Restaurant[]> {
    return this.restaurant.find();
  }

  createRestaurant(
    createRestaurantDTO: createRestaurantDTO,
  ): Promise<Restaurant> {
    // js object create
    const newRestaurant = this.restaurant.create(createRestaurantDTO);
    // server save
    return this.restaurant.save(newRestaurant);
  }
}
