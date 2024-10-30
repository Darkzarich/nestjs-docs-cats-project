import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { InMemoryCatsRepository } from './repositories/in-memory.cats.repository';
import { CATS_REPOSITORY } from './repositories/cats.repository.interface';

@Module({
  controllers: [CatsController],
  providers: [
    CatsService,
    {
      provide: CATS_REPOSITORY,
      // Can be any class that implements ICatsRepository
      // For example, InMemoryCatsRepository or MongoCatsRepository
      useClass: InMemoryCatsRepository,
    },
  ],
})
export class CatsModule {}
