import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurants.entity';
import { Repository } from 'typeorm';
import {
  CreateRestaurantDTO,
  UpdateRestaurantDTO,
} from './dtos/restaurants.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {}

  getAll(): Promise<Restaurant[]> {
    return this.restaurants.find();
  }

  createRestaurant(
    CreateRestaurantDTO: CreateRestaurantDTO,
  ): Promise<Restaurant> {
    const newRestaurant = this.restaurants.create(CreateRestaurantDTO); // js object create
    return this.restaurants.save(newRestaurant); // server save
  }

  updateRestaurant({ id, data }: UpdateRestaurantDTO) {
    return this.restaurants.update(id, { ...data });
  }
}
