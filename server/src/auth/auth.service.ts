/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { users } from '@prisma/client';

import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthRegisterDTO } from './dto/auth-registe.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly JwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async cretateToken(user: users) {
    delete user.password;
    return {
      acess_token: this.JwtService.sign(
        {
          sub: user.id,
          name: user.name,
          email: user.email,
        },
        { expiresIn: '7 days', issuer: 'Login' },
      ),
      user: user,
    };
  }

  checkToken(token: string) {
    try {
      const data = this.JwtService.verify(token, {
        ignoreExpiration: false,
      });
      return data;
    } catch (error) {
      throw new BadRequestException({ message: 'Invalid token', error });
    }
  }

  async isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.prismaService.users.findFirst({
      where: { email },
    });
    if (!user) throw new UnauthorizedException('Usuário inválidos');

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('Usuário ou senha inválidos');

    return this.cretateToken(user);
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);
    return await this.cretateToken(user.user);
  }
}
