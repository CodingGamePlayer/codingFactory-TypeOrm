import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Between,
  Equal,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, UserModel } from './entity/user.entity';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/posts.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
    private readonly appService: AppService,
  ) {}

  @Post('sample')
  async sample() {
    // 모델에 해당되는 객체 생성 - 저장은 안함
    // const user1 = this.userRepository.create({
    //   email: 'test@codefactory.io',
    // });

    // 저장
    // const user2 = await this.userRepository.save({
    //   email: 'test@codefactory.io',
    // });

    // preload
    // 입력된 값을 기반으로 데이터베이스에 있는 데이터를 불러오고
    // 초기 입력된 값으로 데이터베이스애서 가져온 값들을 대체함.
    // 저장하지는 않음.
    // const user3 = await this.userRepository.preload({
    //   id: 101,
    //   email: 'codefactory@codefactory.io',
    // });

    // 삭제하기
    // await this.userRepository.delete({
    //   id: 101,
    // });

    // 값을 증가시킴
    // await this.userRepository.increment({ id: 1 }, 'count', 100);

    // 값을 감소시킴
    // await this.userRepository.decrement({ id: 1 }, 'count', 1);

    // 갯수 카운팅하기
    // const count = await this.userRepository.count({
    //   where: {
    //     email: ILike('%0%'),
    //   },
    // });

    // sum
    // const sum = await this.userRepository.sum('count', {
    //   id: LessThan(3),
    // });

    // average
    // const average = await this.userRepository.average('count', {
    //   id: LessThan(3),
    // });

    // 최솟값
    // const min = await this.userRepository.minimum('count', {
    //   id: LessThan(4),
    // });

    // 최댓값
    // const res = await this.userRepository.maximum('count', {
    //   id: LessThan(4),
    // });

    // const res = await this.userRepository.find({

    // })

    // const res = await this.userRepository.findOne({
    //   where: {
    //     id: 3
    //   }
    // })

    const res = await this.userRepository.findAndCount({
      take: 3,
    });
    return res;
  }

  @Post('users')
  postUser() {
    for (let i = 0; i < 100; i++) {
      this.userRepository.save({
        email: `user-${i}@google.com`,
      });
    }
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      where: {
        // // 아닌 경우 가져오기
        // id: Not(1),
        // 적은 경우
        // id: LessThan(30),
        // 적거나 같은 경우
        // id: LessThanOrEqual(30),
        // 더 큰 경유
        // id: MoreThan(30),
        // 더 크거나 같은 경우
        // id: MoreThanOrEqual(30),
        // 같은 경우
        // id: Equal(30),
        // 유사값
        // email: Like('%google%'),
        // 대문자 소문자 구분 하지 않음
        // email: ILike('%GOOGLE%'),
        // 사이값
        // id: Between(1, 10),
        // 해당되는 여러개의 값
        // id: In([1, 2, 3, 4, 5]),
        // is null
        id: IsNull(),
      },
    });
  }

  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: { id: parseInt(id) },
    });

    return this.userRepository.save({
      ...user,
      email: user.email + '0',
    });
  }

  @Post('user/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'asdf@codefactory.ai',
      profile: {
        profileImg: 'asdf.png',
      },
    });

    // const profile = await this.profileRepository.save({
    //   profileImg: 'asdf.png',
    //   user,
    // });

    return user;
  }

  @Delete('user/profile/:id')
  async deleteUserAndProfile(@Param('id') id: string) {
    await this.profileRepository.delete(+id);
  }

  @Post('user/post')
  async createUserAndPost() {
    const user = await this.userRepository.save({
      email: 'postuser@codefactory.ai',
    });

    await this.postRepository.save({
      author: user,
      title: 'post1',
    });

    await this.postRepository.save({
      author: user,
      title: 'post2',
    });

    return user;
  }

  @Post('posts/tags')
  async createPostAndTags() {
    const posts1 = await this.postRepository.save({
      title: 'NestJS Lecture',
    });

    const post2 = await this.postRepository.save({
      title: 'Programming Lecture',
    });

    const tag1 = await this.tagRepository.save({
      name: 'Javascript',
      posts: [posts1, post2],
    });
    const tag2 = await this.tagRepository.save({
      name: 'TypeScript',
      posts: [posts1],
    });

    const post3 = await this.postRepository.save({
      title: 'NextJs Lecture',
      tags: [tag1, tag2],
    });

    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
