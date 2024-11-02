import {
  Controller,
  Post,
  Body,
  UseFilters,
  HttpStatus,
  HttpCode,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/sign-up-dto';
import { SignInDto } from './dto/sign-in-dto';
import { MongoExceptionFilter } from 'src/common/filters/mongo-exception.filter';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseFilters(new MongoExceptionFilter('User'))
  signUp(@Body() signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.userService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('current')
  @UseGuards(AuthGuard)
  current(@Request() request) {
    const userId = request['user'].id;

    return this.userService.current(userId);
  }
}
