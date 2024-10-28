import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class UpdateCatDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @Min(0)
  @IsInt()
  @IsOptional()
  age: number;

  @IsString()
  @IsOptional()
  breed: string;
}
