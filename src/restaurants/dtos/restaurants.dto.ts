import {
  ArgsType,
  Field,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurants.entity';
import { type } from 'os';

@InputType()
export class CreateRestaurantDTO extends OmitType(Restaurant, ['id']) {}

@InputType()
class UpdateRestaurantInputType extends PartialType(CreateRestaurantDTO) {}

@InputType()
export class UpdateRestaurantDTO {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
