import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateCatDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @Min(0)
  @IsInt()
  age: number;

  @IsNotEmpty()
  @IsString()
  breed: string;
}
