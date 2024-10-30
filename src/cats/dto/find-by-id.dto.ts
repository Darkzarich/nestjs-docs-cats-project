import { IsNotEmpty } from 'class-validator';

export class FindByIdDto {
  @IsNotEmpty()
  id: string;
}
