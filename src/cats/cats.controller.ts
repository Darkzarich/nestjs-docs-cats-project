import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateCatDto } from 'src/cats/dto/create-cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  create(@Body() payload: CreateCatDto) {
    return this.catsService.create({
      id: crypto.randomUUID(),
      ...payload,
    });
  }

  @Get()
  findAll(@Query() query: { limit: number }) {
    if (query.limit) {
      return this.catsService.findAll().slice(0, query.limit);
    }

    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const cat = this.catsService.findById(id);

    if (!cat) {
      throw new NotFoundException();
    }

    return cat;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: Partial<CreateCatDto>) {
    return `This action updates a #${id} cat: ${JSON.stringify(payload)}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
