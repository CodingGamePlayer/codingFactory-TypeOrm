import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

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
  title: string;

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
}
