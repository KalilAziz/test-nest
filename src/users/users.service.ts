import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    const user = this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
      },
    });

    return user;
  }

  async findAll() {
    const users = await this.prismaService.user.findMany();
    return { users };
  }

  async findOne(id: string) {
    const users = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    return { users };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        name: updateUserDto.name,
      },
    });

    return user;
  }

  remove(id: string) {
    const user = this.prismaService.user.delete({
      where: {
        id,
      },
    });

    return user;
  }
}
