import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CATS_REPOSITORY } from './repositories/cats.repository.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './schemas/cat.schema';
import { MongoCatsRepository } from './repositories/mongo.cats.repository';
// import { InMemoryCatsRepository } from './repositories/in-memory.cats.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [CatsController],
  providers: [
    CatsService,
    {
      provide: CATS_REPOSITORY,
      // Can be any class that implements ICatsRepository
      // For example, InMemoryCatsRepository or MongoCatsRepository
      useClass: MongoCatsRepository,
    },
  ],
})
export class CatsModule {}
