import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Food } from '../entities/foods.entities';

@InputType()
export class createFoodDto extends OmitType(Food, ['id']) {}

@InputType()
export class updateFoodInputDto extends PartialType(Food) {}

@InputType()
export class updateFoodDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => updateFoodInputDto)
  data: updateFoodInputDto;
}
