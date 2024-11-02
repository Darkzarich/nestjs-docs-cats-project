import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCatDto } from 'src/cats/dto/create-cat.dto';
import { CatsService } from './cats.service';
import { FindCatsDto } from './dto/find-cats.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { FindByIdDto } from './dto/find-by-id.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('api/cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() payload: CreateCatDto) {
    return this.catsService.create(payload);
  }

  @Get()
  findAll(@Query() query: FindCatsDto) {
    return this.catsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param() { id }: FindByIdDto) {
    return this.catsService.findById({ id });
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param() { id }: FindByIdDto, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  @HttpCode(204) // No Content response on successful deletion
  @UseGuards(AuthGuard)
  remove(@Param() { id }: FindByIdDto) {
    this.catsService.delete(id);
  }
}
