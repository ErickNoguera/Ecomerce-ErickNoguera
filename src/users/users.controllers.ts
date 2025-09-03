import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth-guard.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(@Query(`page`) page: number = 1, @Query(`limit`) limit: number = 5) {
    // if (page && limit) return this.userService.getUsers(page, limit);

    return this.userService.getUsers(page, limit);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUser(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param(`id`, ParseUUIDPipe) id: string) {
    return this.userService.deleteUser(id);
  }
}
