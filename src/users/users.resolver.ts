import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './entities/user.entity';
import { CreateAccountInput, CreateAccountOutput } from './dto/user.dto';
import { UsersService } from './users.service';
import { LoginInput, LoginOutput } from './dto/login.dto';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => Boolean)
  hello(): boolean {
    return true;
  }

  @Mutation((returns) => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      const { ok, error } =
        await this.usersService.createAccount(createAccountInput);
      return {
        ok,
        error,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    try {
      const { ok, error, token } = await this.usersService.login(loginInput);
      return { ok, error, token };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
