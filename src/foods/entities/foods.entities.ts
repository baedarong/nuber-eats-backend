import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/* DataBase Foods Entity */
// 부모 클래스의 타입이 @ObjectType 으로 선언되어 있고
// 자식 클래스의 타입이 @InputType 인 경우 isAbstact option 을 통해 눈속임을 해준다
// Mapped types들을 사용하기 위해서는 @InputType 데코레이터로 선언되어야 한다.

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
