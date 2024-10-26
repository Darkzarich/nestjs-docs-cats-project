import { IsUUID } from 'class-validator';

export class FindByIdDto {
  @IsUUID(4, {
    message: 'id must be an UUID (v4)',
  })
  id: string;
}
