import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  PaginationDto,
  Users,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Get('query/stream')
  queryUsers(@Query() paginationDto: PaginationDto): Observable<Users> {
    const paginationStream = new Observable<PaginationDto>((subscriber) => {
      subscriber.next(paginationDto);
      subscriber.complete();
    });
    return this.usersService.queryUsers(paginationStream);
  }

  @Post('email')
  emailUsers() {
    this.usersService.emailUsers();
    return { message: 'Email users process started' };
  }
}
