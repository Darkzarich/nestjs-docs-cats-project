import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCatDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  name: string;

  @Min(0)
  @IsInt()
  age: number;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  breed: string;
}
