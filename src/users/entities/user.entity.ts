import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { PromiseOrValue } from 'graphql/jsutils/PromiseOrValue';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { IsEmail, IsEnum } from 'class-validator';

enum UserRole {
  Client,
  Owner,
  Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsEmail()
  email: string;

  @Field((type) => String)
  @Column()
  password: string;

  @Field((type) => UserRole)
  @Column({ type: 'enum', enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;

  @BeforeInsert() // DB 저장 전 typeORM Entity Listener
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10); // 단방향 알고리즘, 하지만 언제나 값은 같다
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(inputPassword: string): Promise<boolean> {
    try {
      const result = await bcrypt.compare(inputPassword, this.password);
      return result;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
