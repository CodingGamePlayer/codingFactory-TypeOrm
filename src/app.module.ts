import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { StudentModel, TeacherModel } from './entity/persion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5411,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [UserModel, StudentModel, TeacherModel],
      synchronize: true,
    }),
    UserModel,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
