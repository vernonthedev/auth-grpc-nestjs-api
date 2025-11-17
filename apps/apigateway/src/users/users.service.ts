import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import {
  CreateUserDto,
  UpdateUserDto,
  User,
  Users,
  PaginationDto,
} from '@app/common';
import type { UserService } from '@app/common';
import { Observable, ReplaySubject } from 'rxjs';
import { AUTH_SERVICE } from './constants';

@Injectable()
export class UsersService implements OnModuleInit {
  private userService: UserService;

  constructor(@Inject(AUTH_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userService.CreateUser(createUserDto);
  }

  findAll(): Promise<Users> {
    return this.userService.FindAllUsers({});
  }

  findOne(id: string): Promise<User> {
    return this.userService.FindOneUser({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.UpdateUser({
      id,
      socialMedia: updateUserDto.socialMedia,
    });
  }

  remove(id: string): Promise<User> {
    return this.userService.RemoveUser({ id });
  }

  queryUsers(
    paginationDtoStream: Observable<PaginationDto>,
  ): Observable<Users> {
    return this.userService.QueryUsers(paginationDtoStream);
  }

  emailUsers(): void {
    const users$ = new ReplaySubject<PaginationDto>();

    users$.next({ page: 0, skip: 25 });
    users$.next({ page: 1, skip: 25 });
    users$.next({ page: 2, skip: 25 });
    users$.next({ page: 3, skip: 25 });
    users$.complete();

    let chunkNumber = 1;
    this.userService.QueryUsers(users$).subscribe((users) => {
      console.log('Chunk', chunkNumber, users);
      chunkNumber += 1;
    });
  }
}
