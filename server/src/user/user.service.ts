import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.prisma.users.create({ data: createUserDto });
    delete user.password;
    return { status: 'ok', user };
  }

  async findAll() {
    return (await this.prisma.users.findMany()).map((user) => {
      delete user.password;
      return user;
    });
  }

  async findById(id: number) {
    return this.prisma.users.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.users.findUnique({ where: { email } });
  }
}
