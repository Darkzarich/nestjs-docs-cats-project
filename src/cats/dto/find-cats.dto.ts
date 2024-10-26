import { IsOptional, Min } from 'class-validator';

export class FindCatsDto {
  @IsOptional()
  @Min(0)
  limit?: number;
}
