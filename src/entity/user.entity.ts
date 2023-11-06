import e from 'express';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ProfileModel } from './profile.entity';
import { PostModel } from './posts.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UserModel {
  // ID
  // 자동으로 ID를 생성한다.
  //
  // @PrimaryGeneratedColumn()
  // Primary column은 모든 테이블에서 고유한 값을 가져야 한다.
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  //   @Column({
  //     type: 'varchar',
  //     name: 'title',
  //     length: 30,
  //     nullable: true,
  //     update: false,
  //     select: false,
  //     default: 'default value',
  //     unique: false,
  //   })
  //   title: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;
  // 데이터 생성 일자
  // 데이터 생성되는 날짜와 시간이 자동으로 찍힌다.
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // save() 시 자동으로 1씩 증가한다.
  // 데이터가 변경될 때마다 자동으로 증가한다.
  @VersionColumn()
  version: number;

  @Column()
  @Generated('uuid')
  additionalId: string;

  @OneToOne(() => ProfileModel, (profile) => profile.user, {
    // find() 실행시 자동으로 profile을 eager하게 가져온다.
    eager: false,
    // 저장할때 realtion을 한번에 같이 저장가능
    cascade: true,
    // null이 가능한지
    nullable: true,
    // 과계가 삭제됐을때
    // no action: 아무것도 하지 않는다.
    // cascade: 같이 삭제한다.
    // set null: null로 설정한다.
    // set default: default 값으로 설정한다.
    // restrict: 삭제를 막는다.
    onDelete: 'RESTRICT',
  })
  @JoinColumn()
  profile: ProfileModel;

  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];

  @Column({
    default: 0,
  })
  count: number;
}
