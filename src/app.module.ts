import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { StudentModel, TeacherModel } from './entity/persion.entity';
import {
  AirPlaneModel,
  BookModel,
  CarModel,
  ComputerModel,
  SingleBaseModel,
} from './entity/inheritance.entity';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/posts.entity';
import { TagModel } from './entity/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel, ProfileModel, PostModel, TagModel]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5411,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [
        UserModel,
        StudentModel,
        TeacherModel,
        BookModel,
        CarModel,
        ComputerModel,
        AirPlaneModel,
        SingleBaseModel,
        ProfileModel,
        PostModel,
        TagModel,
      ],
      synchronize: true,
    }),
    UserModel,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
