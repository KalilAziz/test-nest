import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from '../src/database/prisma.service';

type User = {
  name: string;
  email: string;
};

@Controller('users')
export class UsersController {
  constructor(private readonly prismaService: PrismaService) {}
  @Post()
  async createUser(@Body() body: User) {
    const { email, name } = body;

    const user = await this.prismaService.user.create({
      data: {
        name,
        email,
      },
    });
    return {
      message: 'User created correctly',
      user,
    };
  }

  @Get()
  async getUserId(@Body() body: User) {
    const { email } = body;

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    return {
      user,
    };
  }
}
