import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateAccountInput } from './dto/user.dto';
import { LoginInput } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly config: ConfigService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      // 1. check is email available
      const exists = await this.users.findOne({
        where: { email: email },
      });
      if (exists) {
        return { ok: false, error: 'There is a user with that email already' };
      }
      // 2. if new User, insert into Database
      await this.users.save(this.users.create({ email, password, role }));
      return { ok: true };
    } catch (e) {
      return { ok: false, error: "Couldn't create account" };
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    try {
      // 1. find the user with email
      const user = await this.users.findOne({
        where: { email: email },
      });
      if (!user)
        return {
          ok: false,
          error: 'User not found',
        };

      // 2. check if the password is correct
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect)
        return {
          ok: false,
          error: 'Wrong Password',
        };

      // 3. make a JWT and gave it to the user
      const token = jwt.sign({ id: user.id }, this.config.get('SECRET_KEY'));
      return { ok: passwordCorrect, token: token };
    } catch (e) {
      console.log(e);
      return { ok: false, error: 'login process error' };
    }
  }
}
