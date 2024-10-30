/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Injectable } from '@nestjs/common';
import { UpdateCatDto } from '../dto/update-cat.dto';
import { Cat } from '../interfaces/cat.interface';
import { ICatsRepository } from './cats.repository.interface';

@Injectable()
export class MongoCatsRepository implements ICatsRepository {
  create(cat: Cat): Cat {
    throw new Error('Method not implemented.');
  }
  findAll(limit: number): Cat[] {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Cat {
    throw new Error('Method not implemented.');
  }
  update(id: string, updateCatDto: UpdateCatDto): Cat {
    throw new Error('Method not implemented.');
  }
  delete(id: string): void {
    throw new Error('Method not implemented.');
  }
}
