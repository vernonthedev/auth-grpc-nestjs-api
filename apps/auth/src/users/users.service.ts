import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  User,
  Users,
  PaginationDto,
} from '@app/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = {
      id: Date.now().toString(),
      username: createUserDto.username,
      password: createUserDto.password,
      age: createUserDto.age,
      subscribed: false,
      socialMedia: undefined,
    };
    return Promise.resolve(user);
  }

  findAll(): Promise<Users> {
    const users: Users = {
      users: [],
    };
    return Promise.resolve(users);
  }

  findOne(id: string): Promise<User> {
    const user: User = {
      id,
      username: '',
      password: '',
      age: 0,
      subscribed: false,
      socialMedia: undefined,
    };
    return Promise.resolve(user);
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = {
      id,
      username: '',
      password: '',
      age: 0,
      subscribed: false,
      socialMedia: updateUserDto.socialMedia,
    };
    return Promise.resolve(user);
  }

  remove(id: string): Promise<User> {
    const user: User = {
      id,
      username: '',
      password: '',
      age: 0,
      subscribed: false,
      socialMedia: undefined,
    };
    return Promise.resolve(user);
  }

  queryUsers(
    paginationDtoStream: Observable<PaginationDto>,
  ): Observable<Users> {
    return paginationDtoStream.pipe(
      map(() => ({
        users: [],
      })),
    );
  }
}
