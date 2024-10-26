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
} from '@nestjs/common';
import { CreateCatDto } from 'src/cats/dto/create-cat.dto';
import { CatsService } from './cats.service';
import { FindCatsDto } from './dto/find-cats.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  create(@Body() payload: CreateCatDto) {
    return this.catsService.create(payload);
  }

  @Get()
  findAll(@Query() query: FindCatsDto) {
    return this.catsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: Partial<CreateCatDto>) {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  @HttpCode(204) // No Content response on successful deletion
  remove(@Param('id') id: string) {
    this.catsService.delete(id);
  }
}
