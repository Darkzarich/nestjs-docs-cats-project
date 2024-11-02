import { IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  login: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirm: string;
}
