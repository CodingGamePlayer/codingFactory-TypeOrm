import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, UserModel } from './entity/user.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    private readonly appService: AppService,
  ) {}

  @Post('users')
  postUser() {
    return this.userRepository.save({
      role: Role.ADMIN,
    });
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find();
  }

  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: { id: parseInt(id) },
    });

    return this.userRepository.save({
      ...user,
      title: user.title + ' update',
    });
  }
}
