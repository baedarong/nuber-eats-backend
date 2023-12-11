import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// DataBase Foods Entity
@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Food {
  @Field((type) => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String)
  @Column()
  @IsString()
  name: string;

  @Field((type) => Number)
  @Column()
  @IsNumber()
  price: number;

  @Field((type) => Boolean)
  @Column()
  @IsBoolean()
  @IsOptional()
  isMain: boolean;
}
