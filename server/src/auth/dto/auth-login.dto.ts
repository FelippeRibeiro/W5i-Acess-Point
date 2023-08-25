import { IsString } from 'class-validator';

export class AuthLoginDTO {
  @IsString()
  email: string;
  @IsString()
  password: string;
}
